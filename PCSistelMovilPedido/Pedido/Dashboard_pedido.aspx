<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Dashboard_pedido.aspx.vb" Inherits="WebSiteCliente.Dashboard_pedido" %>

<%@ Import Namespace="WebSiteCliente.UtilitarioPCSistel" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">

    <title></title>
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Common/Scripts/jquery-1.7.2.js"></script>
    <script type="text/javascript" src="../Common/Scripts/JqueryUI/jquery-ui.js"></script>
    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/countdown.js" type="text/javascript"></script>
    <script type="text/javascript" src="../Common/Scripts/Utilitario.js"></script>
  
    <link href="Dashboard_pedido.css" rel="stylesheet" type="text/css" />
    <!--[if IE 6]>
    <link href="Dashboard_pedidoIE.css" rel="stylesheet" type="text/css" />
    <![endif]-->

    <style type="text/css">
        .dvSelectCamp {
            width: 200px;
            height: 30px;
            padding: 5px;
            border: 5px solid;
            margin: auto;
            border-radius: 10px;
            cursor: pointer;
            text-align: center;
            font-size: 25px;
            font-weight: bold;
            border-color: #dcdcdc;
        }

            .dvSelectCamp:hover {
                border-color: #90bf90;
            }
    </style>
    <script id="rowTemplate" type="text/x-kendo-tmpl">
        <tr class="#:(data.Estado_linea=='Enviado')?'fila-a-dsbl':'fila-a'#">
            <td class="tdCheck">
                <input id="chk-#:data.Linea#" class="chkSelectLinea" type="checkbox" #:(data.Estado_linea=='Enviado')?'disabled="disabled"':''#/>
		    </td>
		    <td class="tdLinea">
                #:data.Linea#
		    </td>
		    <td class="tdEquipo">
		        #:data.Equipo#
		    </td>
            <td class="tdPlan">
                <img alt="" src="../Common/Images/icono_#:data.NombreOperador#.png" style="width: 18px;height: 18px;float: left;">
		        #:data.Plan#
		    </td>
            <td class="tdNombreCampana">
                #:data.NombreCampana#
            </td>
            <td class="tdEstado_linea">
		        <span class="spanEstado" id="spanEstado-#:data.Linea#"> #:data.Estado_linea# </span>
                <span class="FlagMantienePlan" id="FlagMantienePlan-#:data.Linea#" style="display:none;"> #:data.FlagMantienePlan# </span>
                <span class="spanIdplan" id="spanIdplan-#:data.Linea#" style="display:none;"> #:data.IdPlan# </span>
                <span class="spanHabilitado" id="spanHabilitado-#:data.Linea#" style="display:none;"> #:data.Habilitado# </span>
                <span class="spanRenuevaConEquipo" id="spanRenuevaConEquipo-#:data.Linea#" style="display:none;"> #:data.RenuevaConEquipo# </span>
                <span class="spanPrecioPlan" id="spanPrecioPlan-#:data.Linea#" style="display:none;"> #:data.PrecioPlan# </span>
                <span class="spanIdTipoModeloDispositivo" id="spanIdTipoModeloDispositivo-#:data.Linea#" style="display:none;"> #:data.IdTipoModeloDispositivo# </span>
                <span class="spanTipoServicio" id="spanTipoServicio-#:data.Linea#" style="display:none;"> #:data.TipoServicio# </span>
                <span class="spanIdOperador" id="spanIdOperador-#:data.Linea#" style="display:none;"> #:data.IdOperador# </span>
                <span class="spanHabilitadoPortabilidad" id="spanHabilitadoPortabilidad-#:data.Linea#" style="display:none;"> #:data.HabilitadoPortabilidad# </span>
                <span class="spanFechaFinContrato" id="spanFechaFinContrato-#:data.Linea#" style="display:none;">#:data.FechaFinContrato#</span>
                <span class="spanConEquipo" id="spanConEquipo-#:data.Linea#" style="display:none;">#:data.ConEquipo#</span>
		    </td>
            <td class="tdCosto" style="text-align: right;">
                #:data.PrecioPlan#
            </td>
	    </tr>
    </script>
    <script id="altRowTemplate" type="text/x-kendo-tmpl">
        <tr class="#:(data.Estado_linea=='Enviado')?'fila-b-dsbl k-block':'fila-b k-block'#">
            <td class="tdCheck" style="width:28px;">
                <input id="chk-#:data.Linea#" class="chkSelectLinea" type="checkbox" #:(data.Estado_linea=='Enviado')?'disabled="disabled"':''#/>
		    </td>
		    <td class="tdLinea">
                #:data.Linea#
		    </td>
		    <td class="tdEquipo" >
		        #:data.Equipo#
		    </td>
            <td class="tdPlan">
		        #:data.Plan#
		    </td>
            <td class="tdNombreCampana">
                #:data.NombreCampana#
            </td>
            <td class="tdEstado_linea">
		        <span class="spanEstado" id="spanEstado-#:data.Linea#"> #:data.Estado_linea# </span>
                <span class="FlagMantienePlan" id="FlagMantienePlan-#:data.Linea#" style="display:none;"> #:data.FlagMantienePlan# </span>
                <span class="spanIdplan" id="spanIdplan-#:data.Linea#" style="display:none;"> #:data.IdPlan# </span>
                <span class="spanHabilitado" id="spanHabilitado-#:data.Linea#" style="display:none;"> #:data.Habilitado# </span>
                <span class="spanRenuevaConEquipo" id="spanRenuevaConEquipo-#:data.Linea#" style="display:none;"> #:data.RenuevaConEquipo# </span>
                <span class="spanPrecioPlan" id="spanPrecioPlan-#:data.Linea#" style="display:none;"> #:data.PrecioPlan# </span>
                <span class="spanIdTipoModeloDispositivo" id="spanIdTipoModeloDispositivo-#:data.Linea#" style="display:none;"> #:data.IdTipoModeloDispositivo# </span>
                <span class="spanTipoServicio" id="spanTipoServicio-#:data.Linea#" style="display:none;"> #:data.TipoServicio# </span>
		    </td>
            <td class="tdCosto" style="text-align: right;">
                #:data.PrecioPlan#
            </td>
            <td class="tdMinutos" style="text-align: right;">
                #:data.Minutos#
            </td>
	    </tr>
    </script>
</head>
<body style="overflow: hidden;" scroll="no">
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfAdmin" runat="server" />
        <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
        <asp:HiddenField ID="hdfEmpleado" runat="server" />
        <asp:HiddenField ID="hdfCampanaActiva" runat="server" />
        <asp:HiddenField ID="hdfMsjMantenerPlan" runat="server" />
        <asp:HiddenField ID="hdfMsjCambiarPlan" runat="server" />
        <asp:HiddenField ID="hfUsuario" runat="server" />
        <asp:HiddenField ID="hdfGlosaCreditoEquipo" runat="server" />
        <asp:HiddenField ID="hdfGlosaCreditoServicio" runat="server" />
        <asp:HiddenField runat="server" ID="hdfFecServidor" />
        <asp:HiddenField runat="server" ID="hdfPortabilidadClaro" />
        <%--    <div class="pleaseWait" >    
        <div class="gifPleaseWait">Espere por favor...</div>
    </div>--%>

        <div id="alertas" runat="server">
            <div id="ptriangulo">
                <img alt="" src="../Common/Images/triangulo.png">
            </div>
        </div>
        <div id="DialogoPortabilidad" style="width: 370px; height: 100%; display: none;">
            <br />
            <table style="width:99%; " >
                <tr style="height:20px;">
                    <td style="font-weight: bold;">Nombre:
                    </td>
                    <td>
                        <asp:Label ID="lblNombre1" runat="server"></asp:Label><br />
                    </td>
                </tr>
                 <tr style="height:20px;">
                    <td style="font-weight: bold;">Correo:
                    </td>
                    <td>
                        <asp:Label ID="lblCorreo1" runat="server"></asp:Label>
                    </td>
                </tr>
                <tr style="height:35px;">
                    <td align="center"></td>
                </tr>
               <tr style="height:30px;">
                    <td colspan="2">Deseo portar mis lineas de otro operador a claro</td>
                </tr>
                <tr style="height:20px;">
                    <td style="font-weight: bold;">Contactarme al:
                    </td>
                    <td>
                        <asp:TextBox ID="txtNumContacto" maxlength="9" runat="server"  class="bordeui" style="padding: 4px; border: 1px solid #666; text-align: right;height: 16px; width: 130px; border-radius: 6px;"></asp:TextBox>
                    </td>
                </tr>

               <tr style="height:20px;">
                    <td align="center"></td>
                </tr>
                <tr>
                    <td align="center" colspan="2">
                        <input id="btnAceptarPortabilidad" type="button" value="Aceptar" />
                        &nbsp;&nbsp;
                <input id="btnCancelarDialogPortabilidad" type="button" value="Cancelar" />
                    </td>
                </tr>
            </table>
        </div>
        <div id="DialogoPlan" style="width: 400px; height: 100%">
            <p style="margin-bottom: 5px; margin-top: 5px;">Por favor elija si desea mantener plan o desea elegir un nuevo plan</p>
            <table style="padding-left: 40px; padding-bottom: 10px;">
                <tr>
                    <td>
                        <input checked="checked" id="rbtnMantenerPlan" name="rbtn" type="radio" /><span style="margin-left: 10px; font-weight: bold;">Mantener Plan</span>
                        <br />
                        <asp:Label ID="lblMsjMantenerPlan" runat="server"></asp:Label>
                    </td>
                </tr>
                <tr height="10px">
                    <td align="center"></td>
                </tr>
                <tr>
                    <td>
                        <input id="rbtnNoMantenerPlan" name="rbtn" type="radio" /><span style="margin-left: 10px; font-weight: bold;">Cambiar Plan</span>
                        <br />
                        <asp:Label ID="lblMsjCambiarPlan" runat="server"></asp:Label>
                    </td>
                </tr>
                <tr height="8px">
                    <td align="center"></td>
                </tr>
                <tr>
                    <td align="center">
                        <input id="btnAceptarDialog" type="button" value="Aceptar" />
                        &nbsp;&nbsp;
                <input id="btnCancelarDialog" type="button" value="Cancelar" />
                    </td>
                </tr>
            </table>
            <%--<ul>
        <li>
            <input checked="checked" id="rbtnMantenerPlan" name="rbtn" type="radio" /><span style="margin-left:10px;" >Mantener Plan</span>
        </li>
        <li>
            <input id="rbtnNoMantenerPlan" name="rbtn" type="radio" /><span style="margin-left:10px;">Cambiar Plan</span>
        </li>
    </ul>--%>
            <%--    <input style="margin-left:60px; float:left;" id="btnCancelarDialog" type="button" value="Cancelar" /> <input style="margin-left:0px; float:left;" id="btnAceptarDialog" type="button" value="Aceptar" />    --%>
        </div>

        <div id="general">
            <div id="Principal">
                <div id="divAlerta" class="k-block" style="display: none; position: absolute; right: 60px; top: 2px;" runat="server">
                    <span class="k-icon k-i-note" style="margin-right: 5px;"></span>Ud. tiene 
                <asp:Label ID="lblCantidadMensajes" runat="server" Text=""></asp:Label>
                    nuevos mensajes 
                </div>
                <div id="dvFechas">
                    <table width="100%">
                        <tr>
                            <td align="left" style="color: #4075A7;">
                                <span id="spFecha"></span>
                            </td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div id="pInformacionUsuario" class="pMedium">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr height="5px">
                            <td colspan="4"></td>
                        </tr>
                        <tr>
                            <td colspan="4" class="cGenInfo" align="center">
                                <b>Información del Usuario</b><asp:Label ID="lblServidor" Visible="false" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                        <tr height="8px">
                            <td colspan="4"></td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;" width="150px">
                                <b>Nombre:</b>
                            </td>
                            <td>&nbsp;
                            </td>
                            <td style="vertical-align: bottom;" width="300px">
                                <asp:Label ID="lblNombreEmpleado" runat="server" Text="(Desconocido)"></asp:Label>
                            </td>
                            <td rowspan="8">
                                <img src="" id="imgUser" runat="server" height="75" />
                                <div id="panelCampanasActivas" style="width: 150px; height: 80px; float: right; text-align: center;">
                                    <img class="btnCambiarCampana" src="" id="imgOperador" width="50" height="50" alt="" style="cursor: pointer;" />
                                    <br />
                                    <div class="btnCambiarCampana" style="text-decoration: underline; cursor: pointer; color: blue;">
                                        Cambiar Operador
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr height="4px">
                            <td colspan="3"></td>
                        </tr>
                        <tr>
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
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
                            <td align="right" style="color: #003F59; vertical-align: bottom;">
                                <b>Centro de Costo:</b>
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
                            <td align="right" style="color: #003F59; vertical-align: top;">
                                <b>Número de Líneas-Familia:</b>
                            </td>
                            <td>&nbsp;
                            </td>
                            <td style="vertical-align: top;">
                                <asp:Label ID="lblCantidadLineas" runat="server" Text="0"></asp:Label>
                            </td>
                        </tr>
                        <tr height="10px">
                            <td colspan="3"></td>
                        </tr>
                    </table>
                </div>
                <div id="pIndicadores" class="pMedium " style="display: none;">
                </div>
                <div id="dvTiempoRestante" class="pContenedor EsActivo" style="float: left;"></div>
                <div id="pBotonesPedido" runat="server" class="pContenedor EsActivo" style="float: right; display: none;">
                    <div style="float: left;display:none;"  id="dvPortabilidad">
                        <a href='#' id="lnkPortabilidadClaro" style="font-size: 12px; color: #0065BA;">Portabilidad a Claro (de otras lineas)</a>&nbsp&nbsp
                    </div>
                    <div id="btnNuevoPedido" class="k-button">
                        Nuevo Pedido
                    </div>
                    <div id="btnRenovarPlan" class="k-button" runat="server" style="display: none;">
                        Renovar Plan
                    </div>
                    <div id="btnRenovar" class="k-button">
                        Renovar Línea
                    </div>
                    <div id="btnRenovarConEquipo" class="k-button" style="display: none;">
                        Renovar con equipo
                    </div>
                    <div id="btnBaja" class="k-button">
                        Dar de baja
                    </div>
                    <div id="btnPortabilidad" class="k-button">
                        Portabilidad
                    </div>
                    <div id="btnPortabilidadPlan" class="k-button" style="display: none;">
                        Portabilidad Plan
                    </div>

                </div>
                <div id="dvMsgRestriccion" style="display: none; float: right;">
                    <asp:Label runat="server" ID="lblMsjRestriccion" Style="color: #AA000A; font-size: 12px; font-weight: 100; font-weight: bold; font-style: italic; text-decoration: underline;"></asp:Label>
                </div>
                <div id="dvDivision1" style="clear: both;"></div>
                <div id="plineas" class="pAll">
                    <b>Líneas actuales:</b>
                    <div id="dvLeyenda" style="margin-top: -10px; border: 0px dotted gray; float: right;">
                        <table>
                            <tr>
                                <td style="font-weight: bold;">Activo:
                                </td>

                                <td style="border-right: 1px dotted gray; padding-right: 7px;">L&iacute;nea Asignada 
                                </td>
                                <td style="font-weight: bold; padding-left: 5px;">Enviado:
                                </td>

                                <td style="border-right: 1px dotted gray; padding-right: 7px;">Pedido Enviado
                                </td>
                                <td style="font-weight: bold; padding-left: 5px;">Procesado:
                                </td>

                                <td>Pedido Aceptado 
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div style="clear: both;"></div>
                    <table id="pDetLin">
                        <%--<colgroup>
                        <col style="width: 39px;" />
                        <col style="width: 75px;" />
                        <col style="width: 150px;" />
                        <col style="width: 180px;" />
                        <col style="width: 90px;" />
                        <col style="width: 70px;" />
                        <col style="width: 70px;" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th title="Seleccione" style="width: 41px;">
                                Selec.
                            </th>
                            <th>
                                Línea
                            </th>
                            <th>
                                Equipo
                            </th>
                            <th>
                                Plan
                            </th>
                            <th>
                                Campaña
                            </th>
                            <th>
                                Estado
                            </th>
                            <th>
                                Costo Plan
                            </th>
                        </tr>
                    </thead>--%>
                    </table>
                    <table id="pDetLin_1" style="display: none;">
                        <%--                    <colgroup>
                        <col class="tdLinea"/>
                        <col class="tdIdIMEI"/>
                        <col class="tdEquipo"/>
                        <col class="tdIdPlan"/>
                        <col class="tdPlan"/>
                        <col class="tdEstado_linea"/>
                        <col class="tdCosto"/>
                        <col class="tdMinutos"/>
                    </colgroup>--%>
                        <thead>
                            <tr>
                                <th title="Seleccione" style="width: 30px;">Selec.
                                </th>
                                <th style="width: 60px;">Línea
                                </th>
                                <th style="width: 160px;">Equipo
                                </th>
                                <th style="width: 160px;">Plan
                                </th>
                                <th style="width: 70px;">Campaña
                                </th>
                                <th style="width: 50px;">Estado
                                </th>
                                <th style="width: 50px;">Costo Plan
                                </th>
                                <th style="display: none;">Minutos Plan
                                </th>
                                <%--                            <th width="45">
                                Contrato
                            </th>--%>
                                <%--                            <th>
                                Renovar
                            </th>
                            <th>
                                Dar de baja
                            </th>--%>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div id="dvModalBloq" style="display: none; width: 100%; height: 100%; position: absolute; left: 0px; top: 0px; background: rgba(0, 0, 0, 0.298039); z-index: 6500;"></div>
        <div id="dvCambiarCampana" style="display: none; position: absolute; top: 40%; left: 35%; width: 300px; /*height: 130px; */ background-color: #f5f5f5; z-index: 7500; border-radius: 10px 10px 10px 10px;">
            <div style="text-align: center; width: 100%; height: 30px; background: #1f3050; font-size: 19px; color: whitesmoke; padding: 0px 0px 0px 0px; margin: 0px 0px 5px 0px; border-radius: 10px 10px 0px 0px; font-weight: bold;">
                Campañas Activas
            <div id="dvClose" style="float: right; cursor: pointer; display: block; width: 30px; height: 100%; background-color: #d83838; text-align: center; vertical-align: middle; font-size: 20px; color: white; border-radius: 0px 10px 0px 10px; font-family: cursive">X</div>
            </div>
        </div>
        <script src="<%=UtilitarioGeneral.ObtieneVersionArchivoEstatico("dashboard_pedido.js")%>" type="text/javascript"></script>
    </form>
</body>
</html>
