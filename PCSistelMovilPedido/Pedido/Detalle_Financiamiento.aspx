<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Detalle_Financiamiento.aspx.vb" Inherits="WebSiteCliente.Detalle_Financiamiento" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <%--<script src="Detalle_Financiamiento.js" type="text/javascript"></script>--%>
    <script type="text/javascript">
        eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('$(17(){U()});17 U(){$("#1G").5(4.1D);$("#1C").5(4.1y);$("#1x").5(4.1w);$("#1v").p("9",4.q);$("#t").5(4.E);$("#r").5(4.K);$("#u").5(4.M);$("#1u").p("9",4.O);$("#P").5(4.Q);$("#R").5(4.S);$("#T").5(4.W);$("#1t").p("9",4.Z);$("#1H").p("9",4.13);$("#1q").5(4.w);$("#1p").5(4.A);$("#1m").5(4.z);$("#1k").p("9",4.G);$("#H").5(4.1j);g(4.q==8){$("#o").7("6","h");$("#o").7("6","h");$("#o").7("6","h");$("#o").7("6","h");$("#o").7("6","h");$("#o").7("6","h")}n{g(4.E!=\'0\'&&4.K!=\'0\'){$($("l[k=\'s\']")[0]).j("9",8);$("#1i").7("6","f");$("#u").5(\'\')}n g(4.M!=\'0\'){$($("l[k=\'s\']")[1]).j("9",8);$("#1h").7("6","f");$("#t").5(\'\');$("#r").5(\'\')}n g(4.y!=\'\'){$($("l[k=\'s\']")[2]).j("9",8);$("#1e").7("6","f");$("#1d").7("6","f");$("#t").5(\'\');$("#r").5(\'\');$("#u").5(\'\');g(4.y!=""){m a=4.y.15(",");m b=[];16(m i=0;i<a.18;i++){m c=19.1a(a[i]).1b(0,3);$("#1r-"+a[i]).j("9",8);b.11(c)}1f=a;$("#1g").10("Y").V(b.I(",").F())}}n{$($("l[k=\'s\']")[3]).j("9",8);$("#t").5(\'\');$("#r").5(\'\');$("#u").5(\'\')}}g(4.O==8){$("#1l").7("6","f");g(4.Q!=\'0\'&&4.S!=\'0\'){$($("l[k=\'D\']")[0]).j("9",8);$("#1n").7("6","f");$("#T").5(\'\')}g(4.W!=\'0\'){$($("l[k=\'D\']")[1]).j("9",8);$("#1o").7("6","f");$("#P").5(\'\');$("#R").5(\'\')}}g(4.q==B&&4.Z==8){$("#14").7("6","f");$("#12").7("6","f")}n{$(\'#14\').7("6","h");$(\'#12\').7("6","h");$("#1s").5("");$("#X").N()}$("#X").N();g(4.x!=""&&4.x!=v){m d=4.x.15(",");m b=[];16(m i=0;i<d.18;i++){m e=19.1a(d[i]).1b(0,3);$("#1z-"+d[i]).j("9",8);b.11(e)}1A=d;$("#1B").10("Y").V(b.I(",").F())}g(4.q==B&&4.13==8){$("#L").7("6","f");g(4.w!=\'\'&&4.w!=v&&4.A!=\'\'&&4.A!=v){$($("l[k=\'J\']")[0]).j("9",8);$("#1E").7("6","f")}g(4.z!=\'\'&&4.z!=v){$($("l[k=\'J\']")[1]).j("9",8);$("#1F").7("6","f")}}n{$("#L").7("6","h")}g(4.q==B&&4.G==8){$("#C").7("6","f");$("#1c").7("6","f")}n{$("#C").7("6","h");$("#1c").7("6","h");$("#H").5("")}}',62,106,'||||p_FinanciamientoTipo|val|display|css|true|checked||||||block|if|none||attr|name|input|var|else|trPagoContadoDefinicion|prop|PagoContado|txtPagoContadoMaximo|rblstPagoContado|txtPagoContadoMinimo|txtPagonContado|null|MinimoCuotaPrimeraQuincena|MesesCuotasDobles|MesesCuotas|CuotaPrimeraQuincena|MaximoCuotaPrimeraQuincena|false|trTipoInteres|rblstTipoPeriodoGracia|MinimoCuotas|toString|Interes|txtTasaInteres|join|rblstTipoCuotaQuincena|MaximoCuotas|trCuotaQuincenaDefinicion|Cuotas|empty|PeriodoGracia|txtMinimoMesesPeriodoGracia|MinimoMesesPeriodoGracia|txtMaximoMesesPeriodoGracia|MaximoMesesPeriodoGracia|txtMesesPeriodoGracia|fnMostrarDatos|text|MesesPeriodoGracia|lstbMesesCuotasDobles|kendoComboBox|CuotasDobles|data|push|trMes|CuotaQuincena|trMesesCuotasDobles|split|for|function|length|oFinanciamientoTipo|NombreMes|substring|trTasaInteres|trPagoContadoDefinicionMeses2|trPagoContadoDefinicionMeses1|arValTipos|ddlMesesPagoCuotas|trPagoContadoDefinicionPredefinido|trPagoContadoDefinicionRango|TasaInteres|chkInteres|trPeriodoGraciaDefinicion|txtCuotaPrimeraQuincena|trMaximoMesesPeriodoGracia|trMesesPeriodoGracia|txtMaximoCuotaPrimeraQuincena|txtMinimoCuotaPrimeraQuincena|chkMesCuota|txtMes|chkCuotasDobles|chkPeriodoGracia|chkPagoContado|DescripcionCorta|txtDescripcionCorta|Descripcion|chkMesDobles|arMesesCuotasDobles|ddlMesesCuotasDobles|TextBox1|Codigo|trPorcentajeMaximoCuotaPrimeraQuincena|trPorcentajeCuotaPrimeraQuincena|txtCodigo|chkCuotaQuincena'.split('|'),0,{}))
    </script>
    <style type="text/css">
        
        body, html, input, textarea
        {
            font: 12px "Trebuchet MS" , Verdana, Helvetica, sans-serif;
            color: #1A536A;
            border-radius: 10px;
        }
        
        input, textarea
        {
            border:1px solid #E4F1F7;       
        }
        
        body
        {
            background:#FDFDFD;    
            padding: 0px !important;
            margin:0px !important;
        }

        
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />

    <div>
    <div id="divInfoFinanciamiento">
            <div class="dvPanel">
            <table>
                <tr style="display:none;">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblActivo" runat="server" text="Activo"></asp:Label>
                    </td>
                    <td>
                        <input id="chkEstado" disabled="disabled" type="checkbox"  />
                    </td>
                </tr>
                <tr>
                    <td class="tdEtiqueta">
                        <asp:Label ID="txtCodigoCab" runat="server" text="Código"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtCodigo" Enabled="false" runat="server" class="k-textbox" MaxLength="25"  Width="195"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="tdEtiqueta">
                        <asp:Label ID="txtDescripcionCab" runat="server" text="Descripción"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="TextBox1" Enabled="false" TextMode="MultiLine" runat="server" MaxLength="1000" Width="400px" Height="100px" style="resize: none;"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="tdEtiqueta">
                        <asp:Label ID="txtDescripcionCortaCab" runat="server" text="Descripción Corta"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtDescripcionCorta" Enabled="false" runat="server" MaxLength="20"  Width="195" ></asp:TextBox>
                    </td>
                </tr>
                <tr id="trPagoContadoCab">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblPagoContadoCab" runat="server" text="Pago Contado"></asp:Label>
                    </td>
                    <td>
                        <input id="chkPagoContado" disabled="disabled" type="checkbox" />
                    </td>
                </tr>
                <tr id="trPagoContadoDefinicion" height="70">
                    <td class="tdEtiqueta" colspan="2">
				        <div style="font-size:8pt; margin-top:3px; ">
                            <label>
                                <input type="radio" name="rblstPagoContado" value="1" disabled="disabled" />
                                <span>Definir Cuotas de Financiamiento por rango</span>
                            </label><br />
                            <label>
                                <input type="radio" name="rblstPagoContado" value="2" disabled="disabled" />
                                <span>Definir Cuotas de Financiamiento Predefinido</span>
                            </label>
                            <label><br />
                                <input type="radio" name="rblstPagoContado" value="3" disabled="disabled" />
                                <span>Definir Meses de Financiamiento Predefinido</span>
                            </label>
				        </div>
                    </td>
                </tr>
                <tr id="trPagoContadoDefinicionRango" style="display:none;">
                    <td colspan="2">
                        <table >
                            <tr>
                                <td class="tdEtiqueta" style="width:145px;">
                                    <asp:Label ID="Label1" runat="server" text="Mínimo de cuotas"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtPagoContadoMinimo" Enabled="false" runat="server" MaxLength="8" ></asp:TextBox>
                                </td>
                                <td style="width:20px;"></td>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="Label5" runat="server" text="Máximo de cuotas"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtPagoContadoMaximo" Enabled="false" runat="server" MaxLength="8" ></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trPagoContadoDefinicionPredefinido" style="display:none;">
                    <td colspan="2">
                        <table >
                            <tr>
                                <td class="tdEtiqueta" style="width:145px;">
                                    <asp:Label ID="Label6" runat="server" text="Número de Cuotas"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtPagonContado" Enabled="false" runat="server" MaxLength="8" ></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trPagoContadoDefinicionMeses1" style="display:none;">
                    <td colspan="2">
                        <table >
                            <tr>
                                <td class="tdEtiqueta" style="width:145px;">
                                    <asp:Label ID="Label8" runat="server" text="Meses Pago de Cuotas"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="ddlMesesPagoCuotas" Enabled="false" runat="server" Width="200px"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trPeriodoGracia">
                    <td class="tdEtiqueta" >
                        <asp:Label ID="lblPeriodoGraciaCab" runat="server" text="Periodo de Gracia"></asp:Label>
                    </td>
                    <td>
                        <input id="chkPeriodoGracia" disabled="disabled" type="checkbox" />
                    </td>
                </tr>
                <tr id="trPeriodoGraciaDefinicion" style="display:none;">
                    <td class="tdEtiqueta" colspan="2">
				        <div style="font-size:8pt; margin-top:3px; padding-left:50px;">
                            <label>
                                <input type="radio" disabled="disabled" name="rblstTipoPeriodoGracia" value="1" />
                                <span>Definir Periodo de Gracia por rango</span>
                            </label><br />
                            <label>
                                <input type="radio" disabled="disabled" name="rblstTipoPeriodoGracia" value="2" />
                                <span>Definir Periodo de Gracia Predefinido</span>
                            </label>
				        </div>
                    </td>
                </tr>
                <tr id="trMaximoMesesPeriodoGracia" style="display:none;">
                    <td colspan="2">
                        <table >
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblMinimoMesesPeriodoGraciaCab" runat="server" text="Minimo Meses"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtMinimoMesesPeriodoGracia" Enabled="false" runat="server" MaxLength="8" ></asp:TextBox>
                                </td>
                                <td style="width:20px;"></td>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblMaximoMesesPeriodoGraciaCab" runat="server" text="Máximo Meses"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtMaximoMesesPeriodoGracia" Enabled="false" runat="server" MaxLength="8" ></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trMesesPeriodoGracia" style="display:none;">
                    <td colspan="2">
                        <table >
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblMesesPeriodoGraciaCab" runat="server" text="Meses Periodo Gracia"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtMesesPeriodoGracia" runat="server" Enabled="false" MaxLength="8" ></asp:TextBox>
                                </td>            
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trCuotasDobles">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblCuotasDoblesCab" runat="server" text="Cuotas Dobles"></asp:Label>
                    </td>
                    <td>
                        <input id="chkCuotasDobles" type="checkbox" disabled="disabled" />
                    </td>
                </tr>
                <tr id="trMes" style="display:none;">
                    <td colspan="2">
                        <table >
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblMesesCuotasDobles" runat="server" text="Meses Cuotas Dobles"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox id="ddlMesesCuotasDobles" Enabled="false" runat="server" Width="200px"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trCuotaQuincena">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblCuotaQuincenaCab" runat="server" text="Cuota Quincena"></asp:Label>
                    </td>
                    <td>
                        <input id="chkCuotaQuincena" disabled="disabled" type="checkbox" />
                    </td>
                </tr>
                <tr id="trCuotaQuincenaDefinicion" style="display:none;">
                    <td class="tdEtiqueta" colspan="2">
				        <div style="font-size:8pt; margin-top:3px; padding-left:50px;">
                            <label>
                                <input type="radio" name="rblstTipoCuotaQuincena" value="1" disabled="disabled" />
                                <span>Definir Porcentaje Cuota de Primera Quincena por rango</span>
                            </label><br />
                            <label>
                                <input type="radio" name="rblstTipoCuotaQuincena" value="2" disabled="disabled" />
                                <span>Definir Porcentaje Cuota de Primera Quincena Predefinido</span>
                            </label>
				        </div>
                    </td>
                </tr>
                <tr id="trPorcentajeMaximoCuotaPrimeraQuincena" style="display:none;">
                    <td colspan="2">
                        <table >
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="Label3" runat="server" text="Minimo Porcentaje"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtMinimoCuotaPrimeraQuincena" Enabled="false" runat="server" MaxLength="8" ></asp:TextBox>
                                </td>
                                <td style="width:20px;"></td>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="Label4" runat="server" text="Máximo Porcentaje"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtMaximoCuotaPrimeraQuincena" Enabled="false" runat="server" MaxLength="8" ></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trPorcentajeCuotaPrimeraQuincena" style="display:none;">
                    <td colspan="2">
                        <table >
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="Label2" runat="server" text="Porcentaje Primera Quincena"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtCuotaPrimeraQuincena" Enabled="false" runat="server" MaxLength="8" ></asp:TextBox>
                                </td>        
                            </tr>
                        </table>
                    </td>
                        
                </tr>
                <tr id="trIntereses">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblInteresCab" runat="server" text="Interes"></asp:Label>
                    </td>
                    <td>
                        <input id="chkInteres" type="checkbox" disabled="disabled" />
                    </td>
                </tr>
                <tr id="trTipoInteres" style="display:none;">
                    <td colspan="2">
                        <table >
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblTipoInteresCab" runat="server" text="Tipo de Interes"></asp:Label>
                                </td>
                                <td>
				                    <div style="font-size:8pt; margin-top:3px;" >
                                        <label>
                                            <input type="radio" name="rblstTipoInteres" disabled="disabled"/><span ></span>
                                        </label>
				                    </div>
                                </td>        
                            </tr>
                        </table>
                    </td>
                        
                </tr>
                <tr id="trTasaInteres" style="display:none;">
                    <td colspan="2">
                        <table >
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblTasaInteresCab" runat="server" text="Tasa de Interes"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtTasaInteres" runat="server" Enabled="false" MaxLength="8" ></asp:TextBox>
                                </td>        
                            </tr>
                        </table>
                    </td>
                        
                </tr>
            </table>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
