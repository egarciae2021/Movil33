<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Registrar_pedido.aspx.vb" Inherits="WebSiteCliente.Registrar_pedido" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>    
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    
    <script type="text/javascript" src="../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script id="rowTemplate" type="text/x-kendo-tmpl">
	            <tr class="k-alta">
		            <td class="photo">
                        <div class="gridIma"><img src="../Common/Images/ModeloDispositivo/#:data.ModeloID#.jpg" alt="#: data.ModeloID#" /></div>
		            </td>
		            <td class="details">
			            <span class="title">#:data.DescModelo#</span>
                        <br />
                        <span>Plan:</span> <input class="cboPlanes" placeholder="Seleccione un plan" />
                        <div class="eliEle k-button">Eliminar</div>
		            </td>
		            <td class="employeeID">
		                #: data.id #
		            </td>
	           </tr>
    </script>
    <script id="altRowTemplate" type="text/x-kendo-tmpl">
	    <tr class="k-alt">
		    <td class="photo">
                <div class="gridIma"><img src="../Common/Images/ModeloDispositivo/#:ModeloID#.jpg" alt="#: data.ModeloID #" />/div>
		    </td>
		    <td class="details">
			    <span class="title">#:data.DescModelo#</span>
                <br />
                <span>Plan:</span> <input class="cboPlanes" placeholder="Selecione un plan" />
                <div class="eliEle k-button">Eliminar</div>
		    </td>
		    <td class="employeeID">
		        #: data.id #
		    </td>
	    </tr>
    </script>


    <script type="text/javascript" src="Registrar_pedido.js"></script>
    <link href="Registrar_pedido.css" rel="stylesheet" type="text/css" />

    <meta http-equiv=Content-Type content="text/html; charset=windows-1252">
    <meta name=Generator content="Microsoft Word 15 (filtered)">
   

    <!--[if IE]>
    <style type="text/css">
	    #opacidad
        {
        top:50px;
        }
    </style>
    <![endif]-->
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfAdmin" runat="server" />
    <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
    <asp:HiddenField ID="hdfEmpleado" runat="server" />
    
    <div id="opacidad">
        <div id="mostrar">
            <div id="titCel">
             <span></span>
             <div style="float:right; margin-right:25px;" id="regresar" class="k-button">Atrás</div>

            </div>
            <div id="imaCel">
                <img id="imgCel" alt="dispositvo" src="#">
            </div>
            <div id="infoCel">
                <div class="navtats">
                    <div id="dscCelEle" class="tabDesc tabSelect">
                        Descripción
                    </div>
                    <div id="caracCelEle" class="tabDesc ">
                        Características
                    </div>
                </div>
                <div id="detalleTabsDesc">
                    <div id="dscCel" style="width:440px; height:210px; padding-left:10px;padding-right:10px; overflow:auto;">
                    </div>
                    <div id="caracCel" style="display:none; width:440px; height:210px; padding-left:10px;padding-right:10px; overflow:auto;">
                    </div>
                </div>
            </div>
            <div id="comprarCel">
                <div  id="comprarCelDis" >                
                </div> 
                <div id="comprarCelPre" class="k-block">
                </div>            
                
                Cantidad:<input id="Text1" type="text" size="2" maxlength="2" value="1" class="k-textbox" style="width:95px; margin-left:5px; margin-bottom:5px; margin-top:-25px;" />
                <br />
                <button id="comp" class="k-button">Añadir a carrito</button>
             
            </div>            
            <div style="clear:both;">
                
            </div>
            <div id="cuerpoTats">
                <div class="navtats">
                    <div style="display:none;" id="detalleEle" class="tab">
                        Compra
                    </div>
                    <%--<div  id="CaractEle" class="tab tabSelect">
                        Caracteristicas
                    </div>--%>
                </div>

                <div id="detalleTabs">
                    <div id="pDetEle"  style="display:none;">
                        <table id="gridDetEle">
                            <colgroup>
                                <col class="photo" />
                                <col class="details"/>
                                <col/>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>
                                        Producto
                                    </th>
                                    <th>
                                        Detalles
                                    </th>
                                    <th>
                                        
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="3"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                     <%--<div id="pDetLin">
                       <div class="fLin pLinHead">
                            <div class="cLin cLinId"></div>
                            <div class="cLin">Numero</div>
                            <div class="cLin">Equipo</div>
                            <div class="cLin">servicios</div>
                            <div class="cLin">Estado pedido</div>
                            <div class="cLin">Estado Linea</div> 
                            <div class="cLin cLinObs">Observaciones</div>
                        </div>
                        <div class="fLin">
                            <div class="cLin cLinId">1</div>
                            <div class="cLin">99386888</div>
                            <div class="cLin">Sin equipo</div>
                            <div class="cLin">plan familia</div>
                            <div class="cLin">Procesado</div>
                            <div class="cLin"><select id="Select2"><option value="1">Activo</option><option value="0">Baja</option></select></div> 
                            <div class="cLin cLinObs"></div>
                        </div>
                    </div>--%>                   
                </div>    
            </div>

            <div id="pushCarrito" class="k-button"><img style="float:left; margin-top:-15px;" src="../Common/Images/cart_shop.png" alt="Carrito de compras" />Añadir a carrito</div>
        </div>
    </div>

    <div id="general">
        <div id="principal">
            <div id="head" class="cuerpo">
                <div id="titulo">
                </div>
            </div>
            <div id="body" class="cuerpo">
                <div id="pasos">
                    <div id="paso1" class="paso">
                        Productos
                        <div class="pasonum">
                            1
                        </div>
                    </div>
                    <div id="paso2" class="paso">
                        Forma de pago
                        <div class="pasonum">
                            2
                        </div>
                    </div>
                    <div id="paso3" class="paso">
                        Confirmacion
                        <div class="pasonum">
                            3
                        </div>
                    </div>
                    <div id="paso4" class="paso">
                        Resumen
                        <div class="pasonum">
                            4
                        </div>
                    </div>
                    <div id="mostrar1" class="mostrar">
                    </div>
                    <div id="mostrar2" class="mostrar">
                    </div>
                </div>
                <div id="controlPasos">
                    <div id="contIndicadores">   
                        <div class= "itemIndicador"><div class="indiDesc"><b>Tipo</b></div><div class="indiDisponible"><b>Disponible</b></div><div class="indiDisponible"><b>Utilizado</b></div><div class="indiBar"></div></div>                        

                    </div>

                    <div id="contCampaña">
                        <table border="0" cellpadding="2" cellspacing="0">
                            <tr>
                                <td>
                                Campaña:
                                </td>
                                <td>
                                    <span id="spanNomCam"></span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                Fecha Inicio:
                                </td>
                                <td>
                                <span id="spanFIniCam"></span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                Fecha Fin:
                                </td>
                                <td>
                                <span id="spanFFinCam"></span>
                                </td>
                            </tr>
                            <%--<tr style="color: #FF0000">
                                <td>
                                Fecha Corte:
                                </td>
                                <td>
                                15 /12 /2013
                                </td>
                            </tr>--%>
                        </table>
                    </div>

                    <div id="contItemsCheck">
                        <table border="0" cellpadding="2" cellspacing="0">
                            <tr>
                                <td colspan="2">
                                Usted tiene 0 Items elegidos
                                </td>
                            </tr>
                            <%--<tr>
                                <td>
                                Monto total:
                                </td>
                                <td>
                                S/. 0
                                </td>
                            </tr>
                            <tr>
                                <td>
                                Monto disponible:
                                </td>
                                <td>
                                S/. 500
                                </td>
                            </tr>--%>
                            
                        </table>
                    </div>

                    
                    <div id="btnCarrito" class="k-button">
                        <img src="../Common/Images/cart_shop.png" alt="Carrito de compras" />
                    </div>
                    <div id="4" class="controlNum">
                        4
                    </div>
                    <div id="3" class="controlNum">
                        3
                    </div>
                    <div id="2" class="controlNum">
                        2
                    </div>
                    <div id="1" class="controlNum numElegido">
                        1
                    </div>
                </div>
                <div id="cuer_pe" class="cuerpo_pedidos">
                    <div id="head_pedidos" class="cuerpo_pedidos">
                    </div>
                    <div id="body_pedidos" class="cuerpo_pedidos">
                        <div id="productos" class="pag">
                            <div id="head_productos" class="head_gen">
                                <div id="Div1" class="cuerpo_pedidos">
     <%--                               <div>
                                        <asp:DropDownList ID="ddlFiltro" runat="server" Width="200px">
                                            <asp:ListItem>Modelo</asp:ListItem>
                                            <asp:ListItem>Sistema Operativo</asp:ListItem>
                                            <asp:ListItem>Campaña</asp:ListItem>
                                        </asp:DropDownList>
                                        <asp:TextBox ID="TextBox1" runat="server" class="k-textbox" Width="250px"></asp:TextBox>
                                    </div>
                                    <div>
                                        <div class="filtro">
                                            <span style="float: right" class="ui-icon ui-icon-circle-close"></span><span>Sistema
                                                operativo:android </span>
                                        </div>
                                        <div class="filtro">
                                            <span style="float: right" class="ui-icon ui-icon-circle-close"></span><span>Campaña:navidad
                                            </span>
                                        </div>
                                    </div>--%>
                                <div id="irFormaPago" class="next k-button" alt="(Forma de pago)">
                                    Siguiente >> 
                                </div>
                                </div>
                            </div>
                            <div style="overflow:hidden">
                            <div runat="server" id="cuerpo_productos" class="cuerpo_gen">     

                                <%--<div class="producto"><img src="../../Images/ModeloDispositivo/44.jpg"> 
                                    <div class="productodesc">
                                        <span></span>
                                        <br />
                                        <span></span>
                                    </div>
                                </div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/44.jpg"> 
                                    <div class="productodesc">
                                    </div>
                                </div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/44.jpg"> 
                                    <div class="productodesc">
                                    </div>
                                </div> 
                                <div class="producto"><img src="../../Images/ModeloDispositivo/44.jpg"> 
                                    <div class="productodesc">
                                    </div>
                                </div> --%>
                                 
                            </div>
                            </div>
                            
                            <div id="footer_productos" class="footer_gen">

                            </div>
                        </div>

                        <div id="pago" class="pag">
                            <div class="head_gen">
                                <div id="irConfirmacion" class="next k-button">
                                    Registrar Compra
                                </div>
                                <div id="backProductos" class="back k-button">
                                    << Productos
                                </div>
                            </div>
                            <div class="cuerpo_gen WordSection1">
                            
<p class=MsoNormal align=center style='text-align:center'><b><span
style='font-size:12.0pt;line-height:107%;font-family:"Arial","sans-serif"'>Autorización
de Descuento por Planilla de Remuneraciones</span></b></p>

<p class=MsoNormal><b><span style='line-height:107%;font-family:"Arial","sans-serif"'>Datos
Usuario</span></b></p>

<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 width=721
 style='width:540.75pt;border-collapse:collapse'>
 <tr style='height:15.0pt'>
  <td width=161 nowrap valign=bottom style='width:120.5pt;padding:0cm 3.5pt 0cm 3.5pt;
  height:15.0pt'>
  <p class=MsoNormal align=right style='margin-bottom:0cm;margin-bottom:.0001pt;
  text-align:right;line-height:normal'><b><span style='font-size:10.0pt;
  font-family:"Arial","sans-serif";color:black'>Registro:</span></b></p>
  </td>
  <td width=82 nowrap valign=bottom style='width:61.5pt;padding:0cm 3.5pt 0cm 3.5pt;
  height:15.0pt'>
  <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:10.0pt;font-family:"Arial","sans-serif";
  color:black'>P015XXX</span></p>
  </td>
  <td width=164 nowrap valign=bottom style='width:122.8pt;padding:0cm 3.5pt 0cm 3.5pt;
  height:15.0pt'></td>
  <td width=135 nowrap valign=bottom style='width:101.5pt;padding:0cm 3.5pt 0cm 3.5pt;
  height:15.0pt'>
  <p class=MsoNormal align=right style='margin-bottom:0cm;margin-bottom:.0001pt;
  text-align:right;line-height:normal'><b><span style='font-size:10.0pt;
  font-family:"Arial","sans-serif";color:black'>Nombre de Usuario:</span></b></p>
  </td>
  <td width=179 nowrap valign=bottom style='width:134.45pt;padding:0cm 3.5pt 0cm 3.5pt;
  height:15.0pt'>
  <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:10.0pt;font-family:"Arial","sans-serif";
  color:black'>Beatriz Montenegro Prado</span></p>
  </td>
 </tr>
 <tr style='height:15.0pt'>
  <td width=161 nowrap valign=bottom style='width:120.5pt;padding:0cm 3.5pt 0cm 3.5pt;
  height:15.0pt'>
  <p class=MsoNormal align=right style='margin-bottom:0cm;margin-bottom:.0001pt;
  text-align:right;line-height:normal'><b><span style='font-size:10.0pt;
  font-family:"Arial","sans-serif";color:black'>Número de Documento:</span></b></p>
  </td>
  <td width=82 nowrap valign=bottom style='width:61.5pt;padding:0cm 3.5pt 0cm 3.5pt;
  height:15.0pt'>
  <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:10.0pt;font-family:"Arial","sans-serif";
  color:black'>XXXXXXXX</span></p>
  </td>
  <td width=164 nowrap valign=bottom style='width:122.8pt;padding:0cm 3.5pt 0cm 3.5pt;
  height:15.0pt'></td>
  <td width=135 nowrap valign=bottom style='width:101.5pt;padding:0cm 3.5pt 0cm 3.5pt;
  height:15.0pt'>
  <p class=MsoNormal align=right style='margin-bottom:0cm;margin-bottom:.0001pt;
  text-align:right;line-height:normal'><b><span style='font-size:10.0pt;
  font-family:"Arial","sans-serif";color:black'>Fecha Pedido:</span></b></p>
  </td>
  <td width=179 nowrap valign=bottom style='width:134.45pt;padding:0cm 3.5pt 0cm 3.5pt;
  height:15.0pt'>
  <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:10.0pt;font-family:"Arial","sans-serif";
  color:black'>17/10/2013</span></p>
  </td>
 </tr>
 <tr style='height:15.0pt'>
  <td width=161 nowrap valign=bottom style='width:120.5pt;padding:0cm 3.5pt 0cm 3.5pt;
  height:15.0pt'>
  <p class=MsoNormal align=right style='margin-bottom:0cm;margin-bottom:.0001pt;
  text-align:right;line-height:normal'><b><span style='font-size:10.0pt;
  font-family:"Arial","sans-serif";color:black'>Fechas de Recojo:</span></b></p>
  </td>
  <td width=82 nowrap valign=bottom style='width:61.5pt;padding:0cm 3.5pt 0cm 3.5pt;
  height:15.0pt'>
  <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:10.0pt;font-family:"Arial","sans-serif";
  color:black'>25/10/2013</span></p>
  </td>
  <td width=164 nowrap valign=bottom style='width:122.8pt;padding:0cm 3.5pt 0cm 3.5pt;
  height:15.0pt'></td>
  <td width=135 nowrap valign=bottom style='width:101.5pt;padding:0cm 3.5pt 0cm 3.5pt;
  height:15.0pt'></td>
  <td width=179 nowrap valign=bottom style='width:134.45pt;padding:0cm 3.5pt 0cm 3.5pt;
  height:15.0pt'></td>
 </tr>
 <tr style='height:18.3pt'>
  <td width=161 nowrap valign=bottom style='width:120.5pt;padding:0cm 3.5pt 0cm 3.5pt;
  height:18.3pt'>
  <p class=MsoNormal align=right style='margin-bottom:0cm;margin-bottom:.0001pt;
  text-align:right;line-height:normal'><b><span style='font-size:10.0pt;
  font-family:"Arial","sans-serif";color:black'>Lugar de Recojo:</span></b></p>
  </td>
  <td width=560 nowrap colspan=4 valign=bottom style='width:420.25pt;
  padding:0cm 3.5pt 0cm 3.5pt;height:18.3pt'>
  <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
  normal'><span style='font-size:10.0pt;font-family:"Arial","sans-serif";
  color:black'>Prolongación Primavera 320, (Caminos del Inca), Santiago de
  Surco</span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal><b><span style='font-size:10.0pt;line-height:107%;
font-family:"Arial","sans-serif"'>&nbsp;</span></b></p>

<p class=MsoListParagraphCxSpFirst style='text-indent:-18.0pt'><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>1.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>Autorizo
expresa e irrevocablemente a que procedan al descuento del importe de 9.00
dólares por costo de equipo del monto que me corresponda recibir por concepto
de gratificación del mes de julio del 2011. Tipo cambio referencial del mes de
junio de 2011: 2.83</span></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-18.0pt'><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>2.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>Por
medio de la presente los autorizo expresa e irrevocablemente a efectuar el
descuento por planilla del importa de 7.00 dólares por concepto de Consumo
Mensual (costo plan y minutos adicionales contratado). El descuento se
efectuará a razón de 50% en cada quincena. Declaro conocer y aceptar que el
tipo de cambio a aplicar en cada descuento será el vigente al 10 de cada mes.
Los descuentos se verán reflejados en la correspondiente boleta mensual de
pago.</span></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-18.0pt'><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>3.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>Declaro
conocer y aceptar que en caso de no contar con fondos para cubrir el Consumo
Mensual, se inactivará la(s) línea(s) hasta la regularización del pago. El
plazo máximo para dicha regularización es de 30 días contado a partir de la
fecha de vencimiento del pago, vencido este plazo y no habiéndose efectuado el
pago, procederán a instruir a suspensión definitiva el servicio.</span></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-18.0pt'><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>4.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>En
caso de producirse la extinción del vínculo laboral antes del vencimiento del
plazo mínimo de permanencia en la utilización del servicio (12 meses con
vencimiento el 06/07/2012), los autorizo expresa e irrevocablemente a descontar
el monto correspondiente al Consumo Mensual pendiente de pago, de la
liquidación de beneficios sociales que me corresponda.</span></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-18.0pt'><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>5.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>Declaro
conocer y aceptar que en el supuesto señalado en el numeral precedente, se
procederá dar de baja a la(s) líneas asignada(s), salvo que como usuario de
la(s) misma(s) decida bajo mi responsabilidad mantenerla(s). Para tal efecto,
será mi responsabilidad realizar los trámites ante la empresa operadora para
efectuar la transferencia de titularidad del servicio dentro del término de
siete días calendario.</span></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-18.0pt'><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>6.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>Declaro
conocer y aceptar se procederá a la suspensión del servicio y el inicio a las
acciones que se consideren pertinentes por el uso inadecuado del mismo,
conforme a la normativa vigente y a las disposiciones y condiciones
establecidas.</span></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-18.0pt'><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>7.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>Declaro
conocer y aceptar que en caso de avería por mal uso del equipo, pérdida o robo:
</span></p>

<p class=MsoListParagraphCxSpMiddle style='margin-left:92.15pt;text-indent:
-21.35pt'><span style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>(i)<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>El
costo del chipo será de U$ 5.00 </span></p>

<p class=MsoListParagraphCxSpMiddle style='margin-left:92.15pt;text-indent:
-21.35pt'><span style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>(ii)<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>Pago
de penalidad que corresponda según equipo adquirido (ver tabla de penalidades
Pág. 3 del archivo de Preguntas Frecuentes)</span></p>

<p class=MsoListParagraphCxSpMiddle style='margin-left:92.15pt;text-indent:
-21.35pt'><span style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>(iii)<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp; </span></span><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>La
adquisición de nuevo equipo será a valor de reposición.</span></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-18.0pt'><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>8.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>Declaro
conocer y aceptar que el(los) equipo(s) celular(es) en venta serán de propiedad
del usuario que los adquiera, siendo el empleador el titular del servicio.</span></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-18.0pt'><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>9.<span
style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>El
Plan no incluye costo de mensajes especiales (concurso, horóscopo, SMS
internacional), la utilización de estos servicios adicionales serán de
cubiertos directamente por el usuario y agregados a su Consumo Mensual.</span></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-18.0pt'><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>10.<span
style='font:7.0pt "Times New Roman"'>&nbsp; </span></span><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>Los
equipos cuentan con garantía de un 1 año. La garantía se pierde si el equipo
presenta señales de haber tenido un uso inadecuado y/o haber sufrido daños, señales
de humedad o haber sido manipulado por personal no autorizado.</span></p>

<p class=MsoListParagraphCxSpMiddle style='text-indent:-18.0pt'><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>11.<span
style='font:7.0pt "Times New Roman"'>&nbsp; </span></span><span
style='font-size:10.0pt;line-height:107%;font-family:"Arial","sans-serif"'>En
caso de agotarse los minutos de consumos asignados, los usuarios podrán
utilizar tarjetas prepago convencionales (físicas o virtuales) y podrán acceder
a las promociones de Movistar.</span></p>

<p class=MsoListParagraphCxSpLast><span style='font-size:10.0pt;line-height:
107%;font-family:"Arial","sans-serif"'>&nbsp;</span></p>
                            </div>
                            <div class="footer_gen">

                            </div>
                        </div>
                        <div id="confirmacion" class="pag">
                            <div class="head_gen">
                            </div>
                            <div class="cuerpo_gen">
                            </div>
                            <div class="footer_gen">
                                <div id="irResumen" class="next k-button">
                                    Resumen >>
                                </div>
                                <div id="backPago" class="back k-button">
                                    << Forma de pago
                                </div>
                            </div>
                        </div>
                        <div id="resumen" class="pag">
                            <div class="head_gen">
                            </div>
                            <div class="cuerpo_gen">
                            </div>
                            <div class="footer_gen">
                                <div id="finalizar" class="next k-button">
                                    Finalizar
                                </div>
                                <div id="backConfirmacion" class="back k-button">
                                    << Confirmacion
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="foot_pedidos" class="cuerpo_pedidos">
                    </div>
                </div>
                <div id="generalCarrito">
                    <div  style="width:100%; height:20px; border-bottom:5px solid skyblue; font-size:medium; "  id="headCarrito">
                        Detalle Carrito de compras
                    </div>
                    
                    <div  style="width:100%; height:500px; overflow:scroll; " id="bodyCarrito">

                        <div style="background-color:skyblue; font-weight:bold;" class="prodElehead"><div style="font-weight:bold;" class="prodDesc">Descripcion</div><div style="font-weight:bold;" class="prodServ"> Servicios </div><div style="font-weight:bold;" class="prodPre">precio</div>    </div>
                        <%--<div class="prodEle"><div class="prodDesc">Iphone</div><div class="prodServ"> <input class="chkserv" id="customers" style="width: 140px;"/> </div><div class="prodPre">500.00</div>    </div>
                            <div class="prodEle"><div class="prodDesc">Sansumg</div><div class="prodServ"> <input class="chkserv" id="Text2" style="width: 140px;"/>  </div><div class="prodPre">1000.00</div>    </div>
                            <div class="prodEle"><div class="prodDesc">balckberry</div><div class="prodServ"> <input class="chkserv" id="Text3" style="width: 140px;"/>  </div><div class="prodPre">1299.00</div>    </div>
                            <div class="prodEle"><div class="prodDesc">nokia</div><div class="prodServ"> <input class="chkserv" id="Text4" style="width: 140px;"/>  </div><div class="prodPre">1.0</div>    </div>--%>
                        <%--<div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>
                        <div class="prodEle"></div>--%>

                    </div>
                    <div  style="width:100%; height:20px; border-top:5px solid skyblue; font-size:medium; "id="footCarrito">
                        Total de compra
                    </div>
                </div>
            </div>
            <div id="foot" class="cuerpo">
            </div>
        </div>
    </div>

    <div id="generalPlanes">

        <div id="pTitulo" class="pContenedor ColorPanel">
            <div style="width:100px; margin:auto; font-weight:bold;" class="cGenInfo">
                Mis Pedidos
            </div>
            <%--<div style="float:left; margin-right:30px; margin-top:20px; padding-top:20px;" id="btnNuevoPedido" class="k-button"><img style="float:left; margin-top:-15px;" src="../Common/Images/cart_shop.png" alt="Carrito de compras" />Nuevo pedido</div>--%>
            <div style="float:left; margin-right:5px; margin-top:20px; " id="btnNuevoPedido" class="k-button">Nuevo pedido</div>
            <div style="float:left; margin-right:5px; margin-top:20px; " id="Div2" class="k-button">Actualizar pedido</div>
            <div style="float:left; margin-right:5px; margin-top:20px; " id="Div3" class="k-button">Cancelar pedido</div>

        </div>
        <div style="clear:both;">
        </div>
        <div id="pGrillaPlanes" class="pContenedor ColorPanel">

            <div id="grdPedidos">
            </div>

        </div>
        

    </div>
    </form>
</body>
</html>
