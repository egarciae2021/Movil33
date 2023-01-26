<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Adm_SolicitudesConfiguracion.aspx.cs"
    Inherits="PcSistelMovil2Web.Solicitudes.Adm_SolicitudesConfiguracion" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>
<%@ Register Src="../Common/Controles/BusquedaPrincipal.ascx" TagName="BusquedaPrincipal"
    TagPrefix="uc1" %>
<%@ Register Src="../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico"
    TagPrefix="ttgInfo" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json2.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/KendoUI/kendo.editor.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />
    <%--<script src="../Common/Scripts/ajaxupload.js" type="text/javascript"></script>--%>
    <script src="Adm_SolicitudesConfiguracion.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfTamano" runat="server" Value="" />
    <asp:HiddenField ID="hdfCodTipSol" runat="server" Value="" />
    <asp:HiddenField ID="hdfNumSolicitudes" runat="server" Value="" />
    <asp:HiddenField ID="hdfPersonalizada" runat="server" />
    <asp:HiddenField ID="hdfCodSolSist" runat="server" />
    <asp:HiddenField ID="hdfTecnicoResponsable" runat="server" />
    <asp:HiddenField ID="hdfTecnicoResponsable_Act" runat="server" />
    <div id="dvMsgAlertaExterna" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <div id="dvContenidoAlertaExterna">
        </div>
    </div>
    <%-- Modal tecnico --%>
    <div id="div_modal_tecnico" style="display: none; padding: 0px; margin: 0px; overflow-y: hidden;">
        <br />
        <label style="font-size: 9px;">
            Seleccione un registro que desee y haga click en aceptar</label>
        <table>
            <tr>
                <td>
                    <asp:Label runat="server" ID="Label1" CssClass="" Text="Buscar"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtbusqueda" runat="server" Width="400px" MaxLength="160"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <table id="grid">
                    </table>
                    <div id="pager">
                    </div>
                </td>
            </tr>
        </table>
        <div id="dvModalAcciones" style="float: right; margin-top: 0px;">
            <div id="btnAddTecnico" class="btnNormal" style="width: 80px;">
                <a style="font-size: 10px;">Aceptar</a>
            </div>
            <div id="btnCancelarTecnico" class="btnNormal" style="width: 80px;">
                <a style="font-size: 10px;">Cancelar</a>
            </div>
        </div>
    </div>
    <%-- Fin Modal tecnico--%>
    <div id="dvContenido" runat="server">
        <div id="dvCampos" class="dvPanel" style="overflow: auto;">
            <cc1:AccordionJQ ID="AccordionJQ1" runat="server" EnableViewState="true" CssClass="accordion"
                Style="overflow: none;" TabIndex="0">
                <cc1:ContenedorAccodion Texto="Información General" ID="accInformacionGeneral">
                    <table width="100%">
                        <tr>
                            <td colspan="2">
                                <asp:Label ID="lblMensajeError" runat="Server" ForeColor="Red" Font-Bold="False"
                                    Font-Italic="True"></asp:Label>
                            </td>
                        </tr>
                        <tr style="display: none;">
                            <td class="tdEtiqueta" style="width: 190px;">
                                <asp:Label ID="lblTabla" runat="server" Text="Nombre Tipo"></asp:Label>
                            </td>
                            <td>
                                <table>
                                    <tr>
                                        <td>
                                            <asp:TextBox ID="txtTabla" runat="server" Width="200px" MaxLength="20"></asp:TextBox>
                                        </td>
                                        <td>
                                            <ttgInfo:ToolTipGenerico ID="ttgInfoNombre" runat="server" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdEtiqueta">
                                <asp:Label ID="lblDescripcionTipo" runat="server" Text="Nombre Tipo"></asp:Label>
                            </td>
                            <td class="">
                                <asp:TextBox ID="txtDescripcionTipo" runat="server" Width="200px" MaxLength="50"></asp:TextBox>
                            </td>
                        </tr>
                        <tr style="display: none;">
                            <td class="tdEtiqueta">
                                <asp:Label ID="lblFases" runat="server" Text="Fases"></asp:Label>
                            </td>
                            <td class="">
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <asp:ListBox ID="lstFases" runat="server" Height="150px" Width="210px" multiple="multiple">
                                            </asp:ListBox>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td class="TituloMant">
                                <asp:Label ID="lblPrefijo" runat="server" Text="Prefijo Código"></asp:Label>
                            </td>
                            <td class="ValorMant">
                                <asp:TextBox ID="txtPrefijo" runat="server" Width="40px" MaxLength="5"></asp:TextBox>
                            </td>
                        </tr>
                        <tr id="trMontoFijo" style="display: none;" runat="server">
                            <td class="TituloMant">
                                <asp:Label ID="lblMontoFijo" runat="server" Text="Monto Fijo"></asp:Label>
                            </td>
                            <td class="ValorMant">
                                <asp:CheckBox ID="chkMontoFijo" runat="server"></asp:CheckBox>
                            </td>
                        </tr>
                        <tr id="trMonto" style="display: none;" runat="server">
                            <td class="TituloMant">
                                <asp:Label ID="lblMonto" runat="server" Text="Monto"></asp:Label>
                            </td>
                            <td class="ValorMant">
                                <asp:TextBox ID="txtMonto" runat="server"></asp:TextBox>
                            </td>
                        </tr>
                        <%--<tr id="trFraccionamiento" style="display:none;" runat="server">
                                <td class="TituloMant">
                                    <asp:Label ID="lblFraccionamiento" runat="server" Text="Permite Fraccionar"></asp:Label>
                                </td>
                                <td class="ValorMant">
                                    <asp:DropDownList ID="ddlFraccionamiento" runat="server" >
                                        <asp:ListItem Value="0">NO</asp:ListItem>
                                        <asp:ListItem Value="1">SI</asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                            </tr>--%>
                        <tr id="trUsarDriver" style="display: none;">
                            <td class="TituloMant">
                                <asp:Label ID="lblUsarDriver" runat="server" Text="Usar Driver"></asp:Label>
                            </td>
                            <td class="ValorMant">
                                <asp:CheckBox ID="chkUsarDriver" runat="server"></asp:CheckBox>
                            </td>
                        </tr>
                        <tr>
                            <td class="TituloMant">
                                <asp:Label ID="lblTecnicoResponsable" runat="server" Text="Técnico Responsable"></asp:Label>
                            </td>
                            <td>
                                <asp:TextBox ID="txtresultado" runat="server" Width="200px" MaxLength="100" ReadOnly="true"></asp:TextBox>
                                
                                    <img id="imgTecnico" style="cursor:pointer;" src="../Common/images/Mantenimiento/busqueda_generico.png" />
                                
                            </td>
                            <td class="ValorMant">
                                <div id="dvContenedorTecRes" runat="server" style="float: left;">
                                    <uc1:BusquedaPrincipal ID="bpTecnicoResponsable" runat="server" />
                                </div>
                                <asp:Label ID="lblInforTecRes" runat="server" ForeColor="#4297d7" Font-Size="11px"
                                    Font-Bold="true" Font-Italic="true" Text=""></asp:Label>
                            </td>
                        </tr>
                        <tr id="trActivo" style="display: none;" runat="server">
                            <td class="TituloMant">
                                Activo
                            </td>
                            <td class="ValorMant">
                                <asp:CheckBox ID="chkActivo" runat="server" />
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorAccodion>
                <cc1:ContenedorAccodion Texto="Parámetros" ID="accParametros">
                        <div id="dvParametros" style="margin-bottom:5px;">
                            <table>
                                <tr>
                                    <%--<td>La creación de parámetros permitirá reemplazar datos de la solicitud en cualquiera de los correos a enviar. Por ejemplo, si creo un parámetro de clave "{empleado}" y valor "Empleado" y en Estados de Proceso configuro un envío de correo cada vez que una solicitud se cree con el texto: "Sr {empleado}, la solicitud fue creada exitosamente", el mensaje real que se enviará al empleado será el mismo pero el texto "{empleado}" será reemplazado por el nombre del empleado.</td>--%>
                                    <td>La activación de parámetros permitirá reemplazar datos de la solicitud en cualquiera de los correos a enviar. Por ejemplo, si activo el parámetro "Empleado" con clave "{empleado}" y en Estados de Proceso configuro un envío de correo cada vez que una solicitud se cree con el texto: "Sr {empleado}, la solicitud fue creada exitosamente" (la clave {empleado} puede ser agregada desde la lista de parámetros que aparece en cada configuración de mensajes, o sencillamente digitándola), el mensaje real que se enviará al empleado será el mismo pero el texto "{empleado}" será reemplazado por el nombre del empleado.</td>
                                </tr>
                                <tr style="height: 5px;">
                                    <td colspan="2"></td>
                                </tr>
                            </table>
                            <table width="500px">
                                <%--<tr>
                                    <td style="width:35px;">
                                        <asp:Label ID="lblClave" runat="server" Text="Clave:"></asp:Label>  
                                    </td>
                                    <td>
                                        <asp:TextBox ID="txtClave" runat="server" Width="200px" MaxLength="50"></asp:TextBox>  
                                    </td>
                                    <td></td>
                                </tr>--%>
                                <%--<tr>
                                    <td>
                                        <asp:Label ID="lblValor" runat="server" Text="Valor:"></asp:Label>  
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlValor" runat="server" Width="210px">
                                            <asp:ListItem Text="" Value="-1" Selected="True"></asp:ListItem>
                                        </asp:DropDownList>  
                                    </td>
                                    <td></td>
                                </tr>--%>
                                <%--<tr>
                                    <td class="TituloMant" colspan="3" align="right" >
                                        <asp:Label ID="Label7" runat="server" Text="(Doble click para actualizar un parametro)" Font-Italic="true" ForeColor="Gray"></asp:Label>
                                        <div id="btnAgregarParametro" class="btnNormal" style="width:100px;">
                                            <asp:Image ID="imgAgregarParametro" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                            <asp:Label ID="lblBotonAgregarParametro" runat="server" Text="Agregar"></asp:Label>
                                        </div>                                
                                        <div id="btnQuitarParametro" class="btnNormal" style="width:100px;">
                                            <asp:Image ID="imgQuitarParametro" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png"/>
                                            <asp:Label ID="lblBotonQuitarParametro" runat="server" Text="Quitar"></asp:Label>
                                        </div>                                
                                    </td>
                                </tr>--%>
                                <tr>
                                    <td colspan="3" style="padding-top:5px;">
                                        <table id="tbParametros"></table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </cc1:ContenedorAccodion>
                <cc1:ContenedorAccodion Texto="Estados de Mensaje" ID="accEstadosAprobacion">
                    <div id="dvAprobacion" style="width: 540px;" class="dvTab">
                        <table border="0">
                            <tr>
                                <td>
                                    <cc1:TabJQ ID="tabEstadoAprobacion" runat="server" CssClass="tabs" Style="margin: 0px;
                                        padding: 0px;">
                                        <cc1:ContenedorTabJQ ID="tbMensajeAprobacion" Titulo="Mensaje" CssClass="dvTabContenido MsjApr">
                                                <div id="dvMensajeAprobacion" style="margin:15px;" class="dvTab">
                                                    <table width="100%">
                                                        <tr>
                                                            <td colspan="2">
                                                                Configure mensajes para cada estado.
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="TituloMant">
                                                                <asp:Label ID="lblEstadoAprobacion" runat="server" Text="Estados"></asp:Label>
                                                            </td>
                                                            <td colspan="2">
                                                                <asp:DropDownList ID="ddlEstadoAprobacion" runat="server" Width="210px"></asp:DropDownList>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em;height:0.001em;"></div>
                                                            </td>
                                                        </tr>
                                                        <tr >
                                                            <td class="TituloMant">
                                                                <asp:Label ID="lblEnviarCorreoApr" runat="server" Text="Enviar Correo"></asp:Label>
                                                            </td>
                                                            <td class="ValorMant">
                                                                <asp:CheckBox ID="chkEnviarCorreoApr" runat="server"></asp:CheckBox>
                                                            </td>
                                                        </tr>
                                                        <tr style="height: 5px;">
                                                            <td colspan="2"></td>
                                                        </tr>
                                                    </table>
                                                    <div id="divCorreoAprobacion">
                                                        <table>
                                                            <tr>
                                                                <td colspan="3">
                                                                    <asp:Label ID="lblEnvioDeCorreoApr" runat="server" Text="Este mensaje será enviado cada vez que se cree una solicitud." Font-Italic="True"></asp:Label>  
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width:80px;"><asp:Label ID="lblCorreoApr" runat="server" Text="Correos"></asp:Label></td>
                                                                <td style="width:300px;"><asp:TextBox ID="txtCorreoApr" runat="server" Width="290" MaxLength="2000"></asp:TextBox></td>
                                                                <td style="text-align:left;">
                                                                    <%--<asp:CheckBox ID="chkPropietarioCorApr" Text="Propietario" runat="server"/>
                                                                    <asp:CheckBox ID="chkUsuarioEspecificoCorApr" Text="Usuario Específico" runat="server"/>
                                                                    <asp:CheckBox ID="chkAreaCorApr" Text="Responsable de Área" runat="server"/>--%>
                                                                    <asp:CheckBox ID="chkTecnicoCorApr" text = "Técnico de la Solicitud" runat="server"/>
                                                                    <asp:CheckBox ID="chkOperadorApr" text = "Operador" runat="server"/>
                                                                    <asp:CheckBox ID="chkPlantilla" text = "Usa Plantilla" runat="server"/>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><asp:Label ID="lblAsuntoApr" runat="server" Text="Asunto"></asp:Label></td>
                                                                <td><asp:TextBox ID="txtAsuntoApr" runat="server" Width="290px" MaxLength="100"></asp:TextBox></td>
                                                                <td align="right">
                                                                    <asp:DropDownList ID="ddlParametrosApr" runat="server" Width="200px"></asp:DropDownList>&nbsp;
                                                                    <div id="btnAgregarAsuntoApr" class="btnNormal" style="float:right;" title="Agregar parámetro">
                                                                        <asp:Image ID="imgAgregarAsuntoApr" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"/>
                                                                    </div>
                                                                </td>

                                                            </tr>
                                                            <tr>
                                                                <td valign="top"><asp:Label ID="lblMensajeApr" runat="server" Text="Mensaje"></asp:Label></td>
                                                                <td colspan="2"><asp:TextBox ID="txtMensajeApr" runat="server" TextMode="MultiLine" Height="100px" MaxLength="8000"></asp:TextBox></td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </cc1:ContenedorTabJQ>
                                    </cc1:TabJQ>
                                </td>
                            </tr>
                        </table>
                    </div>
                </cc1:ContenedorAccodion>
                <cc1:ContenedorAccodion Texto="Mensaje Servicio" ID="accMensajeServicio">
                    <table width="100%">
                        <tr>
                            <td>
                                <table id="tbParametrosSrv"></table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table width="100%">
                                    <tr>
                                        <td colspan="3">
                                            <asp:Label ID="lblDescMsjervicio" runat="server" Text="Este mensaje será enviado a cada titular de la empresa una vez el servicio haya terminado de procesar la cola de aprovisionamiento." Font-Italic="True"></asp:Label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width:80px;"><asp:Label ID="lblCorreosSrv" runat="server" Text="Correos"></asp:Label></td>
                                        <td style="width:300px;"><asp:TextBox ID="txtCorreosSrv" runat="server" Width="290" MaxLength="200" Text="{CorreoTitular}" ReadOnly="true"></asp:TextBox></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><asp:Label ID="lblAsuntoSrv" runat="server" Text="Asunto"></asp:Label></td>
                                        <td><asp:TextBox ID="txtAsuntoSrv" runat="server" Width="290px" MaxLength="100"></asp:TextBox></td>
                                        <td align="right">
                                            <asp:DropDownList ID="ddlParametrosSrv" runat="server" Width="200px"></asp:DropDownList>&nbsp;
                                            <div id="btnAgregarSrv" class="btnNormal" style="float:right;" title="Agregar parámetro">
                                                <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top"><asp:Label ID="lblMensajeSrv" runat="server" Text="Mensaje"></asp:Label></td>
                                        <td colspan="2"><asp:TextBox ID="txtMensajeSrv" runat="server" TextMode="MultiLine" Height="100px" MaxLength="8000" Width="100%"></asp:TextBox></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </cc1:ContenedorAccodion>
            </cc1:AccordionJQ>
        </div>
        <br />
        <div id="Div1" style="margin-top: 5px; text-align: left;">
            <div id="btnGuardar" class="btnNormal">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCerrar" class="btnNormal">
                <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cancelar</a>
            </div>
        </div>
    </div>
    <div id="divInfoFinanciamiento" style="display: none; overflow: hidden;">
        <iframe id="ifInfoFinanciamiento" runat="server" style="margin: 0px; padding: 0px;"
            frameborder="0"></iframe>
    </div>
    <%--        <div id="divInfoFinanciamiento" style="display:none;">
            <div class="dvPanel">
            <table>
                <tr style="display:none;">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblActivo" runat="server" text="Activo"></asp:Label>
                    </td>
                    <td>
                        <input id="chkEstado" disabled="disabled" type="checkbox" data-bind="checked: IdEstado"/>
                    </td>
                </tr>
                <tr>
                    <td class="tdEtiqueta">
                        <asp:Label ID="txtCodigoCab" runat="server" text="Código"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtCodigo" Enabled="false" runat="server" MaxLength="25" data-bind="value:Codigo" Width="195"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="tdEtiqueta">
                        <asp:Label ID="txtDescripcionCab" runat="server" text="Descripción"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="TextBox1" Enabled="false" TextMode="MultiLine" runat="server" MaxLength="1000" data-bind="value:Descripcion" Width="400px" Height="100px" style="resize: none;"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td class="tdEtiqueta">
                        <asp:Label ID="txtDescripcionCortaCab" runat="server" text="Descripción Corta"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtDescripcionCorta" Enabled="false" runat="server" MaxLength="20"  Width="195" data-bind="value:DescripcionCorta"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trPagoContadoCab">
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblPagoContadoCab" runat="server" text="Pago Contado"></asp:Label>
                    </td>
                    <td>
                        <input id="chkPagoContado" disabled="disabled" type="checkbox" data-bind="checked:PagoContado"/>
                    </td>
                </tr>
                <tr id="trPagoContadoDefinicion" >
                    <td class="tdEtiqueta" colspan="2">
				        <div style="font-size:8pt; margin-top:3px; padding-left: 50px;">
                            <label>
                                <input type="radio" name="rblstPagoContado" value="1" disabled="disabled" />
                                <span>Definir Cuotas de Financiamiento por rango</span>
                            </label>
                            <label>
                                <input type="radio" name="rblstPagoContado" value="2" disabled="disabled" />
                                <span>Definir Cuotas de Financiamiento Predefinido</span>
                            </label>
                            <label>
                                <input type="radio" name="rblstPagoContado" value="3" disabled="disabled" />
                                <span>Definir Meses de Financiamiento Predefinido</span>
                            </label>
				        </div>
                    </td>
                </tr>
                <tr id="trPagoContadoDefinicionRango" style="display:none;">
                    <td colspan="2">
                        <table style="padding-left:50px;">
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="Label1" runat="server" text="Mínimo de cuotas"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtPagoContadoMinimo" Enabled="false" runat="server" MaxLength="8" data-bind='value: MinimoCuotas'></asp:TextBox>
                                </td>
                                <td style="width:20px;"></td>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="Label5" runat="server" text="Máximo de cuotas"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtPagoContadoMaximo" Enabled="false" runat="server" MaxLength="8" data-bind='value: MaximoCuotas'></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trPagoContadoDefinicionPredefinido" style="display:none;">
                    <td colspan="2">
                        <table style="padding-left:50px;">
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="Label6" runat="server" text="Número de Cuotas"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtPagonContado" Enabled="false" runat="server" MaxLength="8" data-bind='value: Cuotas'></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trPagoContadoDefinicionMeses1" style="display:none;">
                    <td colspan="2">
                        <table style="padding-left:50px;">
                            <tr>
                                <td class="tdEtiqueta" style="width:200px;">
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
                    <td class="tdEtiqueta">
                        <asp:Label ID="lblPeriodoGraciaCab" runat="server" text="Periodo de Gracia"></asp:Label>
                    </td>
                    <td>
                        <input id="chkPeriodoGracia" disabled="true" type="checkbox" data-bind="checked:PeriodoGracia"/>
                    </td>
                </tr>
                <tr id="trPeriodoGraciaNota" style="display:none;">
                        <td class="tdEtiqueta" colspan="2" style="font-style:italic;">
                            Nota: El periodo de gracia comenzará luego de la generación de la próxima cuenta de cobro
                        </td>
                    </tr>
                <tr id="trPeriodoGraciaDefinicion" style="display:none;">
                    <td class="tdEtiqueta" colspan="2">
				        <div style="font-size:8pt; margin-top:3px; padding-left:50px;">
                            <label>
                                <input type="radio" disabled="true" name="rblstTipoPeriodoGracia" value="1" />
                                <span>Definir Periodo de Gracia por rango</span>
                            </label>
                            <label>
                                <input type="radio" disabled="true" name="rblstTipoPeriodoGracia" value="2" />
                                <span>Definir Periodo de Gracia Predefinido</span>
                            </label>
				        </div>
                    </td>
                </tr>
                <tr id="trMaximoMesesPeriodoGracia" style="display:none;">
                    <td colspan="2">
                        <table style="padding-left:50px;">
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblMinimoMesesPeriodoGraciaCab" runat="server" text="Minimo Meses"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtMinimoMesesPeriodoGracia" Enabled="false" runat="server" MaxLength="8" data-bind='value: MinimoMesesPeriodoGracia'></asp:TextBox>
                                </td>
                                <td style="width:20px;"></td>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblMaximoMesesPeriodoGraciaCab" runat="server" text="Máximo Meses"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtMaximoMesesPeriodoGracia" Enabled="false" runat="server" MaxLength="8" data-bind='value: MaximoMesesPeriodoGracia'></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trMesesPeriodoGracia" style="display:none;">
                    <td colspan="2">
                        <table style="padding-left:50px;">
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblMesesPeriodoGraciaCab" runat="server" text="Meses Periodo Gracia"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtMesesPeriodoGracia" runat="server" Enabled="false" MaxLength="8" data-bind='value: MesesPeriodoGracia'></asp:TextBox>
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
                        <input id="chkCuotasDobles" type="checkbox" disabled="true" data-bind="checked:CuotasDobles"/>
                    </td>
                </tr>
                <tr id="trMes" style="display:none;">
                    <td colspan="2">
                        <table style="padding-left:50px;">
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
                        <input id="chkCuotaQuincena" disabled="true" type="checkbox" data-bind="checked:CuotaQuincena"/>
                    </td>
                </tr>
                <tr id="trCuotaQuincenaDefinicion" style="display:none;">
                    <td class="tdEtiqueta" colspan="2">
				        <div style="font-size:8pt; margin-top:3px; padding-left:50px;">
                            <label>
                                <input type="radio" name="rblstTipoCuotaQuincena" value="1" disabled="true" />
                                <span>Definir Porcentaje Cuota de Primera Quincena por rango</span>
                            </label>
                            <label>
                                <input type="radio" name="rblstTipoCuotaQuincena" value="2" disabled="true" />
                                <span>Definir Porcentaje Cuota de Primera Quincena Predefinido</span>
                            </label>
				        </div>
                    </td>
                </tr>
                <tr id="trPorcentajeMaximoCuotaPrimeraQuincena" style="display:none;">
                    <td colspan="2">
                        <table style="padding-left:50px;">
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="Label3" runat="server" text="Minimo Porcentaje"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtMinimoCuotaPrimeraQuincena" Enabled="false" runat="server" MaxLength="8" data-bind='value: MinimoCuotaPrimeraQuincena'></asp:TextBox>
                                </td>
                                <td style="width:20px;"></td>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="Label4" runat="server" text="Máximo Porcentaje"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtMaximoCuotaPrimeraQuincena" Enabled="false" runat="server" MaxLength="8" data-bind='value: MaximoCuotaPrimeraQuincena'></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr id="trPorcentajeCuotaPrimeraQuincena" style="display:none;">
                    <td colspan="2">
                        <table style="padding-left:50px;">
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="Label2" runat="server" text="Porcentaje Primera Quincena"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtCuotaPrimeraQuincena" Enabled="false" runat="server" MaxLength="8" data-bind='value: CuotaPrimeraQuincena'></asp:TextBox>
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
                        <input id="chkInteres" type="checkbox" disabled="disabled" data-bind="checked:Interes"/>
                    </td>
                </tr>
                <tr id="trTipoInteres" style="display:none;">
                    <td colspan="2">
                        <table style="padding-left:50px;">
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblTipoInteresCab" runat="server" text="Tipo de Interes"></asp:Label>
                                </td>
                                <td>
				                    <div style="font-size:8pt; margin-top:3px;" data-bind='foreach: lstTipoInteres'>
				                        <label>
                                            <input type="radio" name="rblstTipoInteres" disabled="true" data-bind='value: valor, checked: $parent.TipoInteres'/><span data-bind='text: texto'></span>
                                        </label>
				                    </div>
                                </td>        
                            </tr>
                        </table>
                    </td>
                        
                </tr>
                <tr id="trTasaInteres" style="display:none;">
                    <td colspan="2">
                        <table style="padding-left:50px;">
                            <tr>
                                <td class="tdEtiqueta">
                                    <asp:Label ID="lblTasaInteresCab" runat="server" text="Tasa de Interes"></asp:Label>
                                </td>
                                <td>
                                    <asp:TextBox ID="txtTasaInteres" runat="server" Enabled="false" MaxLength="8" data-bind='value: TasaInteres'></asp:TextBox>%
                                </td>        
                            </tr>
                        </table>
                    </td>
                        
                </tr>
            </table>
            </div>
        </div>--%>
    <div id="dvArea" style="display: none; padding: 0px; margin: 0px;">
        <iframe id="ifArea" width="730" height="470" frameborder="0" style="padding: 0px;
            margin: 0px;"></iframe>
    </div>
    <div id="dvSolicitudSistema" runat="server" style="display: none;">
        <div>
            Tipo de Solicitud:
            <asp:Label ID="lblTipoSolicitud" runat="server"></asp:Label>
        </div>
        <table id="tbDetCaptura">
            <tr>
                <td>
                    Titulo
                </td>
                <td align="center">
                    Obligatorio
                </td>
                <td align="center">
                    Activo
                </td>
            </tr>
        </table>
        <div id="Div2" style="margin-top: 5px; text-align: left;">
            <div id="btnGuardarSistema" class="btnNormal">
                <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCerrarSistema" class="btnNormal">
                <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cancelar</a>
            </div>
        </div>
    </div>
    <div id="divMsgConfirmQuitarCampo" style="display: none;">
        <%--<span class="ui-icon ui-icon-alert" style="float:left;"></span>--%>
        <%--Este campo está siendo usado como parámetro, se eliminará el parámetro asociado a este campo y deberá revisar la configuración de mensajes y eliminar manualmente el parámetro que se va a eliminar.--%>
        Este campo está siendo usado como parámetro; al eliminarlo o desactivarlo, también
        se eliminará el parámetro relacionado por lo que deberá modificar la configuración
        de mensajes.
        <br />
        <br />
        ¿Desea eliminar de todos modos?
    </div>
    <div id="divValorCondicion" style="display: none;">
        <table width="100%">
            <tr>
                <td colspan="2">
                    <label>
                        Elija entre un valor estático, dinámico o un campo de la soliciud para la condición
                    </label>
                    <label id="lblMsjSelecValor">
                    </label>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="padding-top: 15px;">
                    <input type="radio" id="rbtCampoTipSol" name="rbtTipoValor" value="3" checked="checked" />
                    <label for="rbtCampoTipSol">
                        Campo de la Solicitud</label>
                </td>
            </tr>
            <tr>
                <td style="padding-left: 40px">
                    Campo
                </td>
                <td>
                    <asp:DropDownList ID="ddlCampoTipSol" runat="server" Width="210px">
                        <asp:ListItem Text="" Value="-1" Selected="True"></asp:ListItem>
                    </asp:DropDownList>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="padding-top: 15px;">
                    <input type="radio" id="rbtValorEstatico" name="rbtTipoValor" value="1" />
                    <label for="rbtValorEstatico">
                        Valor Estátitico</label>
                </td>
            </tr>
            <tr>
                <td style="padding-left: 40px; margin-left: 40px; border-left: 40px;">
                    Valor
                </td>
                <td>
                    <asp:TextBox ID="txtValorEstatico" runat="server" Width="200px" disabled="true"></asp:TextBox>
                </td>
                <%--<tr>
                    <td colspan="2" style="padding-top:15px;">
                        Si el "Campo Entidad" es una entidad relacionada a una tabla, deberá ingresar el código correspondiente, si no conoce el códgio, prueba terminar la condición usando la opción "Valor Dinámico"
                    </td>
                </tr>--%>
            </tr>
            <tr>
                <td colspan="2">
                    <label id="lblMsjValorEstatico">
                    </label>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="padding-top: 15px;">
                    <input type="radio" id="rbtValorDinamico" name="rbtTipoValor" value="2" />
                    <label for="rbtValorDinamico">
                        Valor Dinámico</label>
                    &nbsp;&nbsp;<label id="lblEntidadRelacionada"></label>
                </td>
            </tr>
            <tr style="display: none">
                <td style="padding-left: 40px; margin-left: 40px; border-left: 40px;">
                    Entidad
                </td>
                <td>
                    <asp:DropDownList ID="ddlEntidadRelacion" runat="server" Width="210px" disabled="true">
                    </asp:DropDownList>
                </td>
            </tr>
            <tr>
                <td style="padding-left: 40px; margin-left: 40px; border-left: 40px;">
                    Campo
                </td>
                <td>
                    <asp:DropDownList ID="ddlCampoRelacion" runat="server" Width="210px" disabled="true">
                    </asp:DropDownList>
                </td>
            </tr>
            <tr>
                <td style="padding-left: 40px; margin-left: 40px; border-left: 40px;">
                    Valor
                </td>
                <td>
                    <asp:TextBox ID="txtValorCampoRelacion" runat="server" Width="200px" disabled="true"></asp:TextBox>
                    <asp:HiddenField ID="hdfValorCampoRelacion" runat="server" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="right" style="padding-top: 25px;">
                    <div id="btnAgregarValorCondicion" class="btnNormal">
                        <%--<asp:Image ID="imgAceptarVC" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />--%>
                        <asp:Label ID="lblBtnAceptarCondicion" runat="server" Text="Aceptar"></asp:Label>
                    </div>
                    <div id="btnCancelarValorCondicion" class="btnNormal">
                        <%--<asp:Image ID="imgCancelarVC" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />--%>
                        <asp:Label ID="lblBtnCancelarCondicion" runat="server" Text="Cancelar"></asp:Label>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div id="dvConfirmacionDevolucion" style="display: none;">
        Algunas solicitudes generarán conflictos si se realiza este cambio.<br />
        Solicitudes afectadas :
        <label id="lblSolicitudDevolucion">
        </label>
        <br />
        <br />
        Para continuar con el cambio deberá devolver todas la solicitudes al estado de Aprobación
        <b>Pendiente</b> y al estado de Proceso <b>Pendiente</b>.
        <br />
        <br />
        ¿Desea continuar con el cambio?
    </div>
    <div id="dvEnvioCorreoDevolucion" style="display: none;">
        <cc1:TabJQ ID="tabCorreoDevolucion" runat="server" CssClass="tabs" Style="margin: 0px;
            padding: 0px;">
            <cc1:ContenedorTabJQ ID="tbListaSolAfec" Titulo="Lista" CssClass="dvTabContenido"
                Width="500" Height="300">
                <table>
                    <tr>
                        <td style="padding-top: 7px;">
                            <label>
                                Busqueda por Codigo/Nombre Empl:
                            </label>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <asp:TextBox ID="txtBusquedaSolDev" runat="server" Width="265"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 7px;">
                            <table id="tblSolicitudesAfectadas">
                            </table>
                            <div id="pagerSolDev">
                            </div>
                        </td>
                    </tr>
                </table>
            </cc1:ContenedorTabJQ>
            <cc1:ContenedorTabJQ ID="tbParametrosCorDev" Titulo="Parámetros" CssClass="dvTabContenido"
                Width="500" Height="300">
                <table>
                    <tr>
                        <td style="padding-bottom: 7px; padding-top: 7px;">
                            <asp:Label ID="lblInfoParamCorDev" runat="server"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table id="tblParametrosCorDev">
                            </table>
                        </td>
                    </tr>
                </table>
            </cc1:ContenedorTabJQ>
            <cc1:ContenedorTabJQ ID="tbMensajeCorDev" Titulo="Mensaje" CssClass="dvTabContenido"
                Width="490" Height="300">
                <table width="100%">
                    <tr>
                        <td>
                            <asp:DropDownList ID="ddlTipoDestinatario" runat="server">
                            </asp:DropDownList>
                        </td>
                        <td style="padding-bottom: 7px; padding-top: 7px;" align="right">
                            <asp:CheckBox ID="chkEnvioCorDev" runat="server" Checked="true" Text="Enviar correo" />
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 120px;">
                            Destinatarios:
                        </td>
                        <td>
                            <%--<asp:TextBox ID="txtDestinatariosCorDev" runat="server" Width="340" ReadOnly="true"
                                Text="{CorreoEmpleado}"></asp:TextBox>--%>
                            <label id="lblchkPropietario">
                                <input type="checkbox" id="chkPropietario" style="display: none;" />Propietario</label>
                            <label id="lblchkRespAprobacion">
                                <input type="checkbox" id="chkRespAprobacion" style="display: none;" />Resp. Aprobación</label>
                            <label id="lblchkOperador">
                                <input type="checkbox" id="chkOperador"  />Operador</label>
                            <label id="lblchkTecAsignado">
                                <input type="checkbox" id="chkTecAsignado" />Téc. Asignado</label>
                            <label id="lblchkTecResponsable">
                                <input type="checkbox" id="chkTecResponsable" />Téc. Responsable</label>
                            <label id="lblchkAdministrador">
                                <input type="checkbox" id="chkAdministrador" />Administrador</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Asunto:
                        </td>
                        <td>
                            <asp:TextBox ID="txtAsuntoCorDev" runat="server" Width="340" Text="Solicitud {Codigo} devuelta">                                    
                            </asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            Contenido del correo:
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <asp:TextBox ID="txtMensajeCorDev" runat="server" TextMode="MultiLine" Width="465"
                                Rows="10" Style="resize: none;">
                            </asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="font-style: italic; padding-top: 7px;">
                            Detalles de parámetros usados en el correo en la pestaña "Parámetros":
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" align="right" style="padding-top: 10px;">
                            <asp:Label ID="lblAdvertenciaCorDev" runat="server" ForeColor="#4297d7" Font-Size="11px"
                                Font-Bold="true" Style="display: none;">No se enviará ningún correo a los <b>Propietarios</b></asp:Label>
                        </td>
                    </tr>
                </table>
            </cc1:ContenedorTabJQ>
        </cc1:TabJQ>
    </div>
    <div id="dvConfirmacionGuardarDevolucion" style="display: none;">
        Se guardará la nueva configuración del tipo de solicitud y se enviarán los corres
        configurados a los interesados de todas las solicitudes que serán devueltas debido
        al cambio.
        <br />
        <br />
        ¿Desea continuar?
    </div>
    <div id="dvConfirmacionUsuarioEspecifico" style="display: none;">
        Se le asignará el perfil "Responsable De Aprobación" al empleado seleccionado si
        este no cuenta con dicho perfil.
        <br />
        <br />
        ¿Desea continuar?
    </div>
    </form>
</body>
</html>
