<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Pedido.aspx.vb" Inherits="WebSiteCliente.Pedido" %>
<%@ Import Namespace="WebSiteCliente.UtilitarioPCSistel" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title></title>
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    
    <link href="../Common/Scripts/select2/select2.min.css" rel="stylesheet" />
    <script type="text/javascript" src="../Common/Scripts/select2/select2.min.js"></script>

    <link href="Pedido.css" rel="stylesheet" type="text/css" />
    <%--<link href="Pedido_Imprimir.css" rel="stylesheet" type="text/css"  media="print" />--%>
    <%--<meta http-equiv="Content-Type" content="text/html; charset=windows-1252" />
    <meta name="Generator" content="Microsoft Word 15 (filtered)" />--%>
    <!--[if IE 6]>
    <link href="PedidoIE.css" rel="stylesheet" type="text/css" />
    <![endif]-->

    <script id="rowTemplate" type="text/x-kendo-tmpl">
	    <tr class="k-alta">
		    <td class="photo">
                <div class="gridIma">
                <img src="../Common/Images/ModeloDispositivo/#:data.P_inCod#.jpg" alt="#: data.P_inCod#" />                        
                </div>
		    </td>
		    <td class="details">
			    <span class="title" style="float:left">#:data.vcNom#</span>
                <span class="title"  style="margin-left:325px;" >Detalle Plan</span>
                <span style="float:left; margin-top:3px;">Plan :</span> <input class="cboPlanes" placeholder="Seleccione un plan" id="cboPlan-#:data.P_inCod#-#:data.IdPlan#" /><div class="dscPlanCombo" style="cursor: pointer; width: 20px; height:25px; float:left;"><img id="imgDetallePlan" alt="" src="../Common/Images/view.png" class="imgBtn"/></div>                
                <span  class="lblMeses" style="float:left; margin-top:3px; margin-left:7px;margin-right:5px;">Contrato por:</span> <input id="cboMeses-#:data.P_inCod#" class="cboMeses" placeholder="Seleccione un item" />
                <div class="eliEle"><img src="../Common/Images/EliminarComptra_24x19.png" alt=""/></span></div>
                <span style="float:left; margin-top:3px; #:(!UsarPlanDep)?'display:none;':''#">Paquete Datos :</span><input style="#:(!UsarPlanDep)?'display:none;':''#" class="cboOnTop" placeholder="Ninguno" id="cboOnTop-#:data.P_inCod#-#:data.IdPlan#" />
		    </td>
		    <td class="tdPrePro">
		        #: oCultura.Moneda.vcSimMon + " " + data.Precio #
		    </td>
	    </tr>
    </script>

    <script id="altRowTemplate" type="text/x-kendo-tmpl">
	    <tr class="k-alt">
		    <td class="photo">
                <div class="gridIma"><img src="../Common/Images/ModeloDispositivo/#:P_inCod#.jpg" alt="#: data.P_inCod #" />                
                /div>
		    </td>
		    <td class="details">
			    <span class="title" style="float:left">#:data.vcNom#</span>
                <span class="title"  style="margin-left:325px;" >Detalle Plan</span>
                <span style="float:left; margin-top:3px;">Plan :</span> <input class="cboPlanes" placeholder="Selecione un plan" id="cboPlan-#:data.P_inCod#-#:data.IdPlan#"/><div class="dscPlanCombo" style="cursor: pointer; width: 20px; height:25px; float:left;"><img alt="" src="../Common/Images/view.png"/></div>                
                <span  class="lblMeses" style="float:left; margin-top:3px; margin-left:7px;margin-right:5px;">Contrato por:</span> <input id="cboMeses-#:data.P_inCod#" class="cboMeses" placeholder="Seleccione un item" />
                <div class="eliEle"><img src="../Common/Images/EliminarComptra_24x19.png" alt=""/></span></div>
                <span style="float:left; margin-top:3px; #:(!UsarPlanDep)?'display:none;':''#">Paquete Datos :</span><input style="#:(!UsarPlanDep)?'display:none;':''#" class="cboOnTop" placeholder="Ninguno" id="cboOnTop-#:data.P_inCod#-#:data.IdPlan#" />
		    </td>
		    <td class="tdPrePro">
		        #: oCultura.Moneda.vcSimMon + " " + data.Precio #
		    </td>
	    </tr>
    </script>
    <script id="rowTemplate_Cuotas" type="text/x-kendo-tmpl">
	    <tr class="k-alta">
		    <td class="" style="width: 80px;">
                <div class="gridIma">
                    <img src="../Common/Images/ModeloDispositivo/#:data.P_inCod#.jpg" alt="#: data.P_inCod#" />
                </div>
                <div style="text-align: center;" class="tdPrePro">#: oCultura.Moneda.vcSimMon + " " + data.Precio #</div>
		    </td>
            <td style="text-align: center; width: 55px;" class="tdMesFinanc">
                #: data.CuotasEquipo #
            </td>
            <td class="tdPreMen" style="text-align: right;">
                #: formatNumber.newo((data.Precio / data.CuotasEquipo), oCultura.Moneda.vcSimMon + " ") # <br/>#: data.CuotasEquipo == 1 ? '' : '(Al mes)' #
            </td>
		    <td class="" style="">
			    <span class="title" style="">#:data.vcNom#</span>
                <span style="float:left; margin-top:3px;">Plan :</span> <input class="cboPlanes" placeholder="Seleccione un plan" id="cboPlan-#:data.P_inCod#-#:data.IdPlan#" />
                <div class="dscPlanCombo" style="cursor: pointer; width: 20px; height:25px; float:left;"><img id="imgDetallePlan" alt="" src="../Common/Images/view.png" class="imgBtn"/></div>
                <div class="eliEle"><img src="../Common/Images/EliminarComptra_24x19.png" alt=""/></div>
                <span style="float:left; margin-top:3px; #:(!UsarPlanDep)?'display:none;':''#">Paquete Datos :</span><input style="#:(!UsarPlanDep)?'display:none;':''#" class="cboOnTop" placeholder="Ninguno" id="cboOnTop-#:data.P_inCod#-#:data.IdPlan#" />
		    </td>
            <td style="#: rm #">
                <span class="title" style="float:left">Meses</span>
                <input id="cboMeses-#:data.P_inCod#" class="cboMeses" placeholder="Seleccione un item" />
            </td>
		    <td class="tdTotMen" style="text-align: right;">
                #: formatNumber.newo((parseFloat(data.MinPrecioPlan) + parseFloat(data.Precio / data.CuotasEquipo)), oCultura.Moneda.vcSimMon + " ") #
		    </td>
	    </tr>
    </script>
    <script id="altRowTemplate_Cuotas" type="text/x-kendo-tmpl">
	    <tr class="k-alt">
		    <td class="" style="width: 80px;">
                <div class="gridIma">
                    <img src="../Common/Images/ModeloDispositivo/#:P_inCod#.jpg" alt="#: data.P_inCod #" />                
                </div>
                <div style="text-align: center;" class="tdPrePro">#: oCultura.Moneda.vcSimMon + " " + data.Precio #</div>
            </td>
            <td style="text-align: center; width: 55px;" class="tdMesFinanc">
                #: data.CuotasEquipo #
            </td>
            <td class="tdPreMen" style="text-align: right;">
                #: formatNumber.newo((data.Precio / data.CuotasEquipo), oCultura.Moneda.vcSimMon + " ") # <br/>#: data.CuotasEquipo == 1 ? '' : '(Al mes)' #
            </td>
		    <td class="" style="">
			    <span class="title" style="">#:data.vcNom#</span>
                <span style="float:left; margin-top:3px;">Plan :</span> <input class="cboPlanes" placeholder="Selecione un plan" id="cboPlan-#:data.P_inCod#-#:data.IdPlan#"/><div class="dscPlanCombo" style="cursor: pointer; width: 20px; height:25px; float:left;"><img alt="" src="../Common/Images/view.png"/></div>
                <div class="eliEle"><img src="../Common/Images/EliminarComptra_24x19.png" alt=""/></span></div>
                <span style="float:left; margin-top:3px; #:(!UsarPlanDep)?'display:none;':''#">Paquete Datos :</span><input style="#:(!UsarPlanDep)?'display:none;':''#" class="cboOnTop" placeholder="Ninguno" id="cboOnTop-#:data.P_inCod#-#:data.IdPlan#" />
		    </td>
            <td style="#: rm #">
                <span class="title" style="float:left">Meses</span>
                <input id="cboMeses-#:data.P_inCod#" class="cboMeses" placeholder="Seleccione un item" />
            </td>
		    <td class="tdTotMen" style="text-align: right;">
		        #: formatNumber.newo((parseFloat(data.MinPrecioPlan) + parseFloat(data.Precio / data.CuotasEquipo)), oCultura.Moneda.vcSimMon + " ") #
		    </td>
	    </tr>
    </script>
    <script id="rowTemplateCarrito" type="text/x-kendo-tmpl">
	    <tr class="fila-a">		    
            <td class="foto" style="text-align:center;">
                <div class="gridImaCar"><img src="../Common/Images/ModeloDispositivo/#:data.P_inCod#.jpg" alt="#: data.P_inCod#" style="width:35px;" />
                <div class="numProIma" >0</div>
                </div>
		    </td>
		    <td class="detalles">
	            #:data.vcNom#
		    </td>
		    <td class="Stock esPreVenta" CodigoProducto="#: data.P_inCod#">
		        #:data.CantidadDisponible#
		    </td>
            <td class="Precio">
		        #:data.PrecioEquiDesc#
		    </td>
            <td class="Comprar">
		        <input maxlength="2" style="width:30px; text-align:right;margin-left:15px;" class="k-textbox txtCantidadDetalle" value="1"/><div class="subirCarrito k-button">Agregar<span class="k-icon k-i-plus"></div><div style="display:none;"> #:data.P_inCod#</div>
		    </td>
	    </tr>
    </script>
    <script id="altRowTemplateCarrito" type="text/x-kendo-tmpl">
	    <tr class="fila-b">		    
            <td class="foto" style="text-align:center;">
                <div class="gridImaCar"><img src="../Common/Images/ModeloDispositivo/#:data.P_inCod#.jpg" alt="#: data.P_inCod#" style="width:35px;" />
                <div class="numProIma" >0</div>
                </div>
		    </td>
		    <td class="detalles">
	            #:data.vcNom#
		    </td>
		    <td class="Stock esPreVenta" CodigoProducto="#: data.P_inCod#">
		        #:data.CantidadDisponible#
		    </td>
            <td class="Precio">
		        #:data.PrecioEquiDesc#
		    </td>
            <td class="Comprar">
		        <input maxlength="2" style="width:30px; text-align:right;margin-left:15px;" class="k-textbox txtCantidadDetalle" value="1"/><div class="subirCarrito k-button" >Agregar<span class="k-icon k-i-plus"></div><div style="display:none;"> #:data.P_inCod#</div>
		    </td>
	    </tr>
    </script>
    <script type="text/x-kendo-template" id="template">
        <div class="detallePedidos">

        </div>
    </script>

    <script id="rowTemplateVariable" type="text/x-kendo-tmpl">
	    <tr class="k-alta">
		    <td class="photo">
                <div class="gridIma">
                <img src="../Common/Images/ModeloDispositivo/#:data.P_inCod#.jpg" alt="#: data.P_inCod#" />                        
                </div>
		    </td>            
             <td class="tdPrePro">  #: oCultura.Moneda.vcSimMon + " " + formatNumber.newo(data.Precio) #  <br/>#: data.CuotasEquipo == 1 ? '' : '(Al mes)' #   </td>   
		    <td class="details">
			    <span class="title" style="float:left">#:data.vcNom#</span>
                <span class="title"  style="margin-left:325px;" >Detalle Plan</span>
                <span style="float:left; margin-top:3px;">Plan :</span> <input class="cboPlanes" placeholder="Seleccione un plan" id="cboPlan-#:data.P_inCod#-#:data.IdPlan#" /><div class="dscPlanCombo" style="cursor: pointer; width: 20px; height:25px; float:left;"><img id="imgDetallePlan" alt="" src="../Common/Images/view.png" class="imgBtn"/></div>                
                <div class="eliEle" ><img src="../Common/Images/EliminarComptra_24x19.png" alt=""/></span></div>
                <br/><br/>
                <span  class="lblMeses" style="float:left; margin-top:3px;">Contrato por:</span> <input id="cboMeses-#:data.P_inCod#" class="cboMeses" placeholder="Seleccione un item" />                               
                <span style="float:left; margin-top:3px; #:(!UsarPlanDep)?'display:none;':''#">Paquete Datos :</span><input style="#:(!UsarPlanDep)?'display:none;':''#" class="cboOnTop" placeholder="Ninguno" id="cboOnTop-#:data.P_inCod#-#:data.IdPlan#" />
               <span style=" margin-top:3px;">Financiamiento Equipo: </a>   <input class="cboFinanVar" placeholder="Seleccione un financiamiento" id="cboFinanVar-#:data.P_inCod#" " />              
		    </td>
		 <%--   <td class="tdMontoEquipo">#: oCultura.Moneda.vcSimMon + " " + data.Total # </td>--%>
	    </tr>
    </script>

        <script id="altRowTemplateVariable" type="text/x-kendo-tmpl">
	    <tr class="k-alt">
		    <td class="photo">
                <div class="gridIma"><img src="../Common/Images/ModeloDispositivo/#:P_inCod#.jpg" alt="#: data.P_inCod #" />                
                </div>
		    </td>
            <td class="tdPrePro">  #: oCultura.Moneda.vcSimMon + " " + formatNumber.newo(data.Precio) #  <br/>#: data.CuotasEquipo == 1 ? '' : '(Al mes)' #   </td>            

		    <td class="details">
			    <span class="title" style="float:left">#:data.vcNom#</span>
                <span class="title"  style="margin-left:325px;" >Detalle Plan</span>
                <span style="float:left; margin-top:3px;">Plan :</span> <input class="cboPlanes" placeholder="Selecione un plan" id="cboPlan-#:data.P_inCod#-#:data.IdPlan#"/><div class="dscPlanCombo" style="cursor: pointer; width: 20px; height:25px; float:left;"><img alt="" src="../Common/Images/view.png"/></div>                
                <div class="eliEle"><img src="../Common/Images/EliminarComptra_24x19.png" alt=""/></span></div>
                <br/><br/>
                <span  class="lblMeses" style="float:left; margin-top:3px;">Contrato por:</span> <input  id="cboMeses-#:data.P_inCod#" class="cboMeses" placeholder="Seleccione un item" />               
                <span style="float:left; margin-top:3px; #:(!UsarPlanDep)?'display:none;':''#">Paquete Datos :</span><input style="#:(!UsarPlanDep)?'display:none;':''#" class="cboOnTop" placeholder="Ninguno" id="cboOnTop-#:data.P_inCod#-#:data.IdPlan#" />
                <span style="margin-top:3px;">Financiamiento Equipo: </a> <input  class="cboFinanVar" placeholder="Seleccione un financiamiento" id="cboFinanVar-#:data.P_inCod#" " /> 
		    </td>
		<%--   <td class="tdMontoEquipo">#: oCultura.Moneda.vcSimMon + " " + data.Total # </td>--%>
	    </tr>
    </script>

</head>
<body style="overflow: hidden;" scroll="no">
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfAdmin" runat="server" />
        <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
        <asp:HiddenField ID="hdfEmpleado" runat="server" />
        <asp:HiddenField ID="hdfEsDirecto" runat="server" />
        <asp:HiddenField ID="hdfEsConEquipo" runat="server" />
        <asp:HiddenField ID="hdfIdPedidoMirror" runat="server" />
        <asp:HiddenField ID="hdfIdPedidoEditar" runat="server" />
        <asp:HiddenField ID="hfUsuario" runat="server" />
        <asp:HiddenField ID="hdfFecServidor" runat="server" />
        <asp:HiddenField runat="server" ID="hdfMuestraNumeroContacto" Value="0" />
    
    

    <div id="MostrarDealleFlo" style="position: absolute; left: 0px; top: 0px; background-color: #003F59; box-shadow: 0px 0px 5px gray; padding: 3px; border-radius: 5px; z-index: 999999; display: none; color: White;">Click para mostrar detalle</div>
        <div id="global">
            <div id="generalPedido" class="general" style="display: none !important;">
                <div id="pTituloPedido" class="pContenedor">
                    <div style="width: 700px; margin: auto; font-weight: bold; font-size: 14pt; text-align: center;"
                        class="cGenInfo titulo">
                    </div>
                </div>
                <div id="pBotonesPedido" class="pContenedor" style="display: none;" runat="server">
                    <div id="btnNuevoPedido" class="menuGridPedido k-button">
                        Nuevo
                    </div>
                    <div id="btnEditarPedido" class="menuGridPedido k-button">
                        Editar
                    </div>
                    <div id="btnEliminarPedido" class="menuGridPedido k-button">
                        Eliminar
                    </div>
                    <div id="dvLeyenda" class="menuGridPedido">
                        <table style="font-size: 8pt; position: absolute; right: 30px; top: 73px" cellspacing="0"
                            cellpadding="0">
                            <tr>
                                <td id="tdNoDespacho" style="width: 15px;" class="ui-corner-all"></td>
                                <td style="padding-right: 5px;">
                                    <b>Enviado:</b> Pedido En Proceso.
                                </td>
                                <td id="tdYaDespacho" style="width: 15px;" class="ui-corner-all"></td>
                                <td style="padding-right: 5px;">
                                    <b>Procesado:</b> Pedido Enviado Al Operador
                                </td>
                                <td id="tdNoFechaDespacho" style="width: 15px;" class="ui-corner-all"></td>
                                <td style="padding-right: 5px;">
                                    <b>Cancelado:</b> Pedido Eliminado
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="pGrillaPedido" class="pContenedor">
                    <div id="grdPedidos">
                    </div>
                </div>
            </div>
            <div id="generalCarrito" class="general">
                <div id="pPanelCarrito" class="pContenedor">
                    <div id="contenedorBtnCarrito">
                        <div id="btnCarritoCant">
                            <span>0</span><img class="warpimagen" src="../Common/Images/burbujainvi.png" />
                        </div>
                        <div id="btnCarrito">
                            <img src="../Common/Images/cart_shop.png" />
                        </div>
                    </div>
                    <div id="btnProcesar">
                        <img src="../Common/Images/compra.png" />
                    </div>
                    <div id="contIndicadores">
                        <div class="itemIndicador">
                            <div class="indiDesc">
                                <b>Tipo</b>
                            </div>
                            <div class="indiDisponible">
                                <b>Aprobado</b>
                            </div>
                            <div class="indiDisponible">
                                <b>Utilizado</b>
                            </div>
                            <div class="indiDisponible">
                                <b>Disponible</b>
                            </div>
                            <div class="indiDisponible">
                                <b>Estado Crédito</b>
                            </div>
                            <div class="indiBar">
                            </div>
                        </div>
                    </div>
                    <div id="contCampaña">
                        <table border="0" cellpadding="2" cellspacing="0" class="cGenInfo">
                            <tr>
                                <td style="font-weight: bold;">
                                    <span id="spanCamDesc">Campaña:</span>
                                </td>
                                <td>
                                    <span id="spanNomCam"></span>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight: bold;">
                                    <span id="span1">Operador:</span>
                                </td>
                                <td>
                                    <span id="spanNomOpe"></span>
                                </td>
                            </tr>
                            <tr class="ocultarPre">
                                <td style="font-weight: bold;">Fecha Inicio:
                                </td>
                                <td>
                                    <span id="spanFIniCam"></span>
                                </td>
                            </tr>
                            <tr class="ocultarPre">
                                <td style="font-weight: bold;">Fecha Fin:
                                </td>
                                <td>
                                    <span id="spanFFinCam"></span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <span id="spanNumElegidoRenovacion"></span>
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
                    <%--                <div id="contItemsCheck" class="cGenInfo">
                    <table border="0" cellpadding="2" cellspacing="0">
                        <tr>
                            <td colspan="2" style="font-weight:bold;">
                                Usted tiene 0 Items elegidos
                            </td>
                        </tr>
                    </table>
                </div>--%>
                </div>
                <div id="cuerpoTaps">
                    <div class="navtaps">
                        <div id="tapProducto" class="tap tapSelect" style="color: darkred;">
                            <div class="pasocompra" id="paso1">
                                Paso 1 :
                            </div>
                            Escoja Equipo
                        </div>
                        <div id="tapCarrito" class="tap" style="color: darkred;">
                            <div class="pasocompra" id="paso2">
                                Paso 2 :
                            </div>
                            Plan y Plazo Contrato
                        </div>
                        <div id="tapDeclaracion" class="tap" style="color: darkred; padding-left: 5px;">
                            Paso 3 : Financiamiento y Compra
                        </div>
                        <div id="tapProceso" class="tap">
                            &nbsp;Detalle del Pedido
                        </div>
                    </div>
                    <div id="detalleTaps">
                        <div id="pSelecPro">
                            <div id="toolBarPro">
                                <select style="float: left;" id="required" data-placeholder="Seleccione categoria...">
                                    <option>Tipo Producto</option>
                                    <option>Nombre</option>
                                    <option>Precio</option>
                                </select>
                                <div id="pddlModelo" style="float: left; display: none;">
                                    <select style="float: left; width: 400px;" id="ddlModelo" data-placeholder="Seleccione modelo...">
                                    </select>
                                </div>
                                <div id="pddlGama" style="float: left; display: none;">
                                    <select style="float: left; width: 400px;" id="ddlGama" data-placeholder="Seleccione gama...">
                                    </select>
                                </div>
                                <div id="ptxtNombre" style="float: left; display: none;">
                                    <input style="width: 440px; margin-top: 5px; margin-left: 15px;" id="txtNombre" type="text" class="k-textbox" maxlength="50" />
                                </div>
                                <div id="pTxtPrecio" style="float: left; display: none;">
                                    <span style="margin-left: 15px;">Mínimo : </span>
                                    <input style="width: 150px; margin-top: 5px; text-align: right;" id="txtPrecioMin" type="text" class="k-textbox" maxlength="6" />
                                    <span>Máximo : </span>
                                    <input style="width: 150px; margin-top: 5px; text-align: right;" id="txtPrecioMax" type="text" class="k-textbox" maxlength="6" />
                                </div>
                                <div id="pTipo" style="float: left;">
                                    <select style="margin-left: 5px; width: 100px;" id="ddlTipo" data-placeholder="Seleccione Tipo...">
                                    </select>
                                    <select style="margin-top: -33px; margin-left: 120px; width: 340px;" id="ddlTipoServicio" multiple="multiple" data-placeholder="Seleccione ...">
                                    </select>
                                </div>
                                <div id="btnFiltroProducto" class="k-button" style="float: right; width: 70px; height: 33px; margin-right: 40px; padding-top: 7px;">
                                    Buscar
                                </div>
                            </div>
                            <table id="gridPro">
                                <thead>
                                    <tr>
                                        <th role="columnheader" data-title="Producto" class="k-header">Producto
                                        </th>
                                        <th role="columnheader" data-title="Detalles" class="k-header">Detalles
                                        </th>
                                        <th role="columnheader" data-title="Stock" class="k-header esPreVenta">Stock
                                        </th>
                                        <th role="columnheader" data-title="Precio" class="k-header">Precio Desde
                                        </th>
                                        <th role="columnheader" data-title="Comprar" class="k-header">Comprar
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <div id="pDetEle" style="display: none;">
                            <table id="gridDetEle">
                            </table>
                            <table id="gridDetEle_1" style="display: none;">
                                <colgroup>
                                    <col class="" style="width: 80px;" />
                                    <col style="width: 55px;" />
                                    <col />
                                    <col style="width: 400px;" />
                                    <col />
                                    <col />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>Producto
                                        </th>
                                        <th>Cuotas<br />
                                            Equipo
                                        </th>
                                        <th>Monto
                                        </th>
                                        <th>Detalles
                                        </th>
                                        <th>Contrato
                                        </th>
                                        <th>Mensual
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="3"></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="k-block k-info-colored" id="totalesCarrito">
                                <div style="float: right; margin-right: 15px; font-size: 12pt;">
                                    Total mensual (pedido): <span></span>
                                </div>
                                <div style="float: right; margin-right: 15px; font-size: 12pt; display: none;">
                                    * Usted a superado su consumo disponible
                                </div>
                            </div>
                        </div>
                        <div id="pDeclaracion" style="display: none; height: 320px; overflow: auto; padding: 40px;">
                            <div id="pnlCompra" class="esPreVenta">
                                <ul id="ulFinanciamiento">
                                    <li><span style="font-weight: bolder;">Financiamiento : </span></li>
                                    <li>
                                        <asp:DropDownList ID="ddlFinanciamiento" runat="server">
                                        </asp:DropDownList>
                                        <span id="spanDdlFinanciamiento" style="font-weight: bold; color: #003F59; font-size: 10pt;"></span>
                                    </li>
                                    <li>
                                        <img id="imgVerDetalleFinanciamiento" src="../Common/Images/view.png" />
                                    </li>
                                </ul>
                                <%--<p>
                                Se enviará su solicitud al proveedor el 27 de Julio del 2016, esta no podra ser modificada despues de esa fecha.(<span id="declaracionFechaActual"></span>). Para confirmar
                                su compra deberá aceptar las condiciones del contrato.
                            </p>--%>
                                <p>
                                    Se enviará su solicitud al proveedor, no podrá ser modificada después de <span id="fechaLimiteModificacion"></span>. Para confirmar su compra deberá aceptar las condiciones del contrato.
                                </p>
                                <div id="dvLugarEntrega" runat="server" style="padding-bottom: 10px; display: none;">
                                    Lugar de entrega:&nbsp;&nbsp;<asp:DropDownList runat="server" ID="ddlLugarEntregaPedido" Style="padding: 4px; font-size: 11px; width: 500px;"></asp:DropDownList>
                                    <br />
                                    <br />
                                    <asp:Label ID="lblDireccionCompleta" runat="server" Style="color: #003F59; font-weight: bold; width: 8px;" />
                                </div>

                                <div id="dvNumeroContactoPedido" style="display:none;" > 
                                    Número de Contacto:&nbsp;<input style="width: 140px; margin-top: 5px; margin-left: 15px;" id="txtNumeroContactoPedido" type="text" class="k-textbox" maxlength="9" />&nbsp;<a  style="color:darkred;" title="Campo Obligatorio">(*)</a>
                                         <br />
                                    <br />
                                </div>
                                <input id="chkConfirmarTerminos" type="checkbox" /><span>Acepto haber leído y estar
                                de acuerdo con las <a class="getCondicionesTemrinos" style="text-decoration: underline;">condiciones.</a></span>
                                <div style="clear: both; margin-bottom: 20px;">
                                </div>
                                <div id="btnComprarConfirmado" style="width: 120px; height: 50px; cursor: hand; cursor: pointer; border: 0px dotted gray; margin: auto;">
                                    <img id="imgCompraimg" style="max-width: 100%; width: 100%; height: 100%" src="../Common/Images/boton_comprar.jpg" />
                                </div>
                            </div>
                            <div id="pnlPreventa" style="display: none;">
                                <p runat="server" id="pDscPreventa"></p>
                                <div style="clear: both; margin-bottom: 20px;"></div>
                                <div id="btnPreventaConfirmado" style="width: 120px; height: 90px; cursor: hand; cursor: pointer; border: 0px dotted gray; margin: auto;">
                                    <img style="max-width: 100%; width: 100%; height: 100%" src="../Common/Images/reserva.png" />
                                </div>
                            </div>
                        </div>
                        <%--<div id="pProcesoCompra" style="display: none; height: 430px; overflow: auto;">--%>
                    </div>
                </div>
            </div>
            <div id="opacidad" style="display: none;" class="general">
                <div id="titCel">
                    <span></span>
                    <div style="float: right; margin-right: 25px;" id="regresar" class="k-button">
                        Atrás
                    </div>
                </div>
                <div id="imaCel" style="text-align: center;">
                    <img id="imgCel" style="width: 145px;" alt="dispositvo" src="#">
                </div>
                <div id="infoCel">
                    <div class="navtats">
                        <div id="dscCelEle" class="tabDesc tabSelect">
                            Descripción
                        </div>
                        <div id="caracCelEle" class="tabDesc">
                            Características
                        </div>
                    </div>
                    <div id="detalleTabsDesc">
                        <div id="dscCel" style="width: 440px; height: 210px; padding-left: 10px; padding-right: 10px; overflow: auto;">
                        </div>
                        <div id="caracCel" style="display: none; width: 440px; height: 210px; padding-left: 10px; padding-right: 10px; overflow: auto;">
                        </div>
                    </div>
                </div>
                <div id="comprarCel">
                    <div id="comprarCelDis">
                    </div>
                    <div id="comprarCelPre" style="width: 249px;" class="k-block">
                    </div>
                    Cantidad:<input id="Text1" type="text" size="2" maxlength="2" value="1" class="k-textbox"
                        style="width: 95px; margin-left: 5px; margin-bottom: 5px; margin-top: -25px;" />
                    <br />
                    <div id="comp" class="k-button">
                        Añadir a carrito
                    </div>
                </div>
            </div>

        </div>
        <div id="pnlticket" style="width: 66%; background-color: White; overflow-x: hidden; overflow-y: scroll; position: relative !important; height: 460px; left: 135px; top: 70px; box-shadow: rgb(44, 34, 34) 6px 4px 3px; background-image: none; border-radius: 5px; display: none; z-index: 2000;">
            <%--<div class="EliDetPlan"><span class="k-icon k-i-close"></span></div>--%>
            <div class="EliDetPlan" title="Presione para cerrar">
            </div>
            <div class="cGenInfo titulo" style="width: 500px; height: auto;">
                <b><span id="lblNombre"></span></b>
            </div>
            <br />
            <table class="miTabla" border="0" cellpadding="0" cellspacing="0" style="width: 100%; height: auto; position: relative !important;">
                <%--        <tr>
            <td colspan="2" align="center" style="padding: 0px;">
                
            </td>
        </tr>--%>
                <tr>
                    <td style="width: 100px;">
                        <b>
                            <asp:Label ID="lblDescripcionTitulo" runat="server" Text="Descripción" Style='width: 100px;'></asp:Label></b>
                    </td>
                    <td>
                        <span id="lblDescripcion"></span>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px;">
                        <b>
                            <asp:Label ID="lblOperadorTitulo" runat="server" Text="Operador" Style='width: 100px;'></asp:Label></b>
                    </td>
                    <td>
                        <span id="lblOperador"></span>
                    </td>
                </tr>
                <tr>
                    <td style="width: 100px;">
                        <b>
                            <asp:Label ID="lblMontoTitulo" runat="server" Text="Monto" Style='width: 100px;'></asp:Label></b>
                    </td>
                    <td>
                        <span id="lblMonto"></span>
                    </td>
                </tr>
            </table>
            <table id="TblDetPlan" class="miTabla" border="0" cellpadding="0" cellspacing="0"
                style="width: 100%; height: auto; position: relative !important;">
            </table>
        </div>
        <div id="capaPopUp" style="display: none" runat="server">
        </div>
        <div id="arrowPaso3">
            <div style="z-index: 4000;">
                paso 3:
            </div>
            <img style="margin-top: -40px;" src="../Common/Images/triangulo.png" />
        </div>
        <div id="pnlDscFinanciamiento" style="display: none;">
            <iframe id="frmDscFinanciamiento" frameborder="0" style="padding: 0px; margin: 0px;" height="80%" width="100%"></iframe>
        </div>
        <div id="pnlBuscarLugarEntrega" style="display: none">
            <%--<uc1:BusquedaPrincipal ID="busquedaLugar" runat="server" />--%>
        </div>

        <div id="pProcesoCompra" style="display: none; width: 100%; height: 100%; overflow: auto; position: absolute; left: 0px; top: 0px; z-index: 99999;">
            <div style="width: 100%; text-align: center; color: #003F59; font-size: 12pt;">Resumen de Pedido</div>
            <table id="tbResComp" cellpadding="0" cellspacing="0" border="0" style="margin: 5px 0px 15px 15px;">
                <tr>
                    <td align="left" style="color: #003F59; vertical-align: bottom;">
                        <b>Fecha:</b>
                    </td>
                    <td>&nbsp;
                    </td>
                    <td style="vertical-align: bottom;">
                        <asp:Label ID="lblFechaPedi" runat="server" Text="(Desconocido)"></asp:Label>
                    </td>
                </tr>
                <tr height="4px">
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <td align="left" style="color: #003F59; vertical-align: bottom;">
                        <b>Nombre:</b>
                    </td>
                    <td>&nbsp;
                    </td>
                    <td style="vertical-align: bottom;">
                        <asp:Label ID="lblNombreEmpleado" runat="server" Text="(Desconocido)"></asp:Label>
                    </td>
                    <%--<td rowspan="8">
                    <img src="" id="imgUser" runat="server" height="75" />
                </td>--%>
                </tr>
                <tr height="4px">
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <td align="left" style="color: #003F59; vertical-align: bottom;">
                        <b>Área:</b>
                    </td>
                    <td>&nbsp;
                    </td>
                    <td style="vertical-align: bottom;">
                        <asp:Label ID="lblArea" runat="server" Text="(Desconocido)"></asp:Label>
                    </td>
                </tr>
                <tr height="4px">
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <td align="left" style="color: #003F59; vertical-align: bottom;">
                        <b>Centro de Costos:</b>
                    </td>
                    <td>&nbsp;
                    </td>
                    <td style="vertical-align: bottom;">
                        <asp:Label ID="lblCentroCosto" runat="server" Text="(Desconocido)"></asp:Label>
                    </td>
                </tr>
                <tr height="4px">
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <td align="left" style="color: #003F59; vertical-align: bottom;">
                        <b>Código de pedido:</b>
                    </td>
                    <td>&nbsp;
                    </td>
                    <td style="vertical-align: bottom;">
                        <asp:Label ID="lblCodigoPedido" runat="server" Text="(Desconocido)"></asp:Label>
                    </td>
                </tr>
                <tr height="4px">
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <td align="left" style="color: #003F59; vertical-align: bottom;">
                        <b>Estado de pedido:</b>
                    </td>
                    <td>&nbsp;
                    </td>
                    <td style="vertical-align: bottom;">
                        <asp:Label ID="lblEstadoPedidoCompra" runat="server" Text="(Desconocido)"></asp:Label>
                    </td>
                </tr>
            </table>
            <div id="grid1">
            </div>
            <div id="btnVolverPedidos" class="k-button" style="width: 200px; height: 30px; margin: 15px 0px 0px 260px; font-weight: bolder;">
                Ir a mis pedidos
            </div>
            <div id="btnImprimirCompraPedido" class="btnNormal" style="float: left; margin-left: 10px; margin-top: 15px; display: none;">
                <asp:Image ID="imgCerrarServicio" runat="server" ImageUrl="~/Common/Images/imprimir.png" />
            </div>
            <%--                        <div id="btnGetProceso" class="k-button" style="width:200px; height:30px; font-weight:bolder; float:left; " runat="server">
            Imprimir pedido
        </div>--%>
            <%--<asp:Button ID="btnGetProceso" runat="server" Text="Imprimir pedido" class="k-button" style="width:200px; height:30px; font-weight:bolder; float:left; "/>--%>
        </div>
        <div id="detalleEliminar" style="position: absolute; left: 0px; top: 0px; background-color: #003F59; box-shadow: 0px 0px 5px gray; padding: 3px; border-radius: 5px; z-index: 999999; display: none; color: White;">Click para eliminar</div>
        <div id="detallePlan" style="position: absolute; left: 0px; top: 0px; background-color: #003F59; box-shadow: 0px 0px 5px gray; padding: 3px; border-radius: 5px; z-index: 999999; display: none; color: White;">Detalle Plan</div>
        
            <div id="DialogoEquiposAdquiridos" style="display: none;z-index: 999999;" >
            <div class="pMedium">
                <h2 style="text-align:center;font-size:15px;font-weight:normal;color:#0065BA">Resultado de su pedido</h2>
                <img id="imgEquipoNoAdquirido" src="../Common/Images/Alerta_16x16.png" alt="Equipos no adquiridos" style="display:none;"" /> <asp:Label ID="lblEquiposNoAdquiridos" runat="server" Text="" style="display:none;font-weight: bold;font-size:14px;"></asp:Label>
                <br /> <br />
                <table id="tbEquipos" style="width:650px;"></table>
                <br />
               <center><input id="btnCerrarDialogPedido" type="button" value="Aceptar" /></center> 
            </div>
        </div>

        <script src="<%=UtilitarioGeneral.ObtieneVersionArchivoEstatico("Pedido.js")%>" type="text/javascript"></script>
    </form>
</body>
</html>
