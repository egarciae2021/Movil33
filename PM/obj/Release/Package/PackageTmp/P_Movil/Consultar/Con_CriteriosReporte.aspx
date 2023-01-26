<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Con_CriteriosReporte.aspx.vb" Inherits="P_Movil_Consultar_Con_CriteriosReporte" %>

<%@ Register src="../../Common/Controles/ToolTipGenerico.ascx" tagname="ToolTipGenerico" tagprefix="ttgInfo" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register src="../../Common/Controles/BusquedaPrincipal.ascx" tagname="BusquedaPrincipal" tagprefix="uc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js"></script>
    <%--***Inicio*** Agregado por RRAMOS --%>
    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqueryui/jquery.ui.button.js"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqueryui/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.accordion.js"></script><%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <link rel="stylesheet" type="text/css" href="../../Common/Styles/jqGrid/ui.jqgrid.css" /><%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script><%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script><%--(Se cruza con el Base del BusquedaPrincipal)--%>
    <%--***Fin***  Agregado por RRAMOS--%>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/date.js" type="text/javascript"></script>    
    <script src="../../Common/Scripts/jquery.cookie.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Entidades/ENT_MOV_Historicos.js" type="text/javascript"></script>
    <script src="Con_CriteriosReporte.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfvcTab" runat="server" />
        <asp:HiddenField ID="hdfvcTipRep" runat="server" />
        <asp:HiddenField ID="hdfNumHis" runat="server" />
        <asp:HiddenField ID="hdfEmpSel" runat="server" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />

        <div id="dvCargando" class="dvCargando"></div>
        <div id="dvCargandoInicial" class="ui-widget-content ui-corner-all" style="position:fixed; left:50%; top:50%; padding:10px; z-index:1000; width:128px; height:70px; text-align:center;display:none;">
            <img alt="Cargando" src="../../Common/Images/Mantenimiento/Cargando.gif"/>
            <br />
            Cargando...
        </div>
        <div id="divMsgConfirmacion" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            <asp:Label ID="lblMensajeConfirmacion" runat="server" Text="¿Desea guardar los cambios ?"></asp:Label>
        </div>        
        <div style="font-size: 18px; text-align: center; width: 99%;">
            <%--<b>Criterios Adicionales - Hist&oacutericos</b> &nbsp;--%>
            <b><asp:Label ID="LblTitulo" runat="server" Text="Criterios Adicionales - Hist&oacutericos"></asp:Label></b> &nbsp;
        </div>

        <br />

        <div id="dvContenido">
            <div id="dvContAcordeon" style="float:left; margin-top:10px;  ">
                <cc1:AccordionJQ ID="AccordionJQ1" runat="server" CssClass="accordion">
                    <cc1:ContenedorAccodion Texto="Organización" style="padding-top:0px; margin-top:0px;">
                        <cc1:AccordionJQ ID="AccordionJQ2" runat="server" CssClass="accordion">
                            <cc1:ContenedorAccodion Texto="Por Empleado" style="padding-top:0px; margin-top:0px;" runat="server" ID="accordEmpleado">
                                <div id="dvEmpleado">
                                    <table>
                                        <tr>
                                            <td>
                                                <div id="btnEmpleado" class="btnNormal" runat="server">
                                                    <img alt="Cliente" src="../../Common/Images/Mantenimiento/Clientes.png" />
                                                </div>
                                            </td>
                                            <td>
                                                <asp:ListBox ID="lstEmpleado" runat="server" Width="350px" Height="76px" SelectionMode="Multiple"></asp:ListBox>
                                            </td>
                                            <td valign="middle" >
                                                <div id="btnQuitarEmpleado" class="btnNormal" runat="server" style="width:80px;">
                                                    <table border="0" cellpadding="0" cellspacing ="0">
                                                    <tr>
                                                    <td>
                                                    <asp:Image ID="imgQuitarEmpleado" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                                    </td>
                                                    <td>
                                                    <a>&nbsp;Quitar</a>
                                                    </td>
                                                    </tr>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </cc1:ContenedorAccodion>
                            <cc1:ContenedorAccodion Texto="Por Línea" style="padding-top:0px; margin-top:0px;" runat="server" ID="accordLinea">
                                <div id="dvLinea">
                                    <table>
                                        <tr>
                                            <td>
                                                <div id="btnLinea" class="btnNormal" runat="server">
                                                    <img alt="Línea" src="../../Common/Images/Mantenimiento/Celular.png" />
                                                </div>
                                            </td>
                                            <td>
                                                <asp:ListBox ID="lstLinea" runat="server" Width="350px" Height="76px" SelectionMode="Multiple"></asp:ListBox>
                                            </td>
                                            <td valign="middle" >
                                                <div id="btnQuitarLinea" class="btnNormal" runat="server" style="width:80px;">
                                                    <table border="0" cellpadding="0" cellspacing ="0">
                                                    <tr>
                                                    <td>
                                                    <asp:Image ID="imgQuitarLinea" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                                    </td>
                                                    <td>
                                                    <a>&nbsp;Quitar</a>
                                                    </td>
                                                    </tr>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </cc1:ContenedorAccodion>
                            <cc1:ContenedorAccodion ID="accordOfiOrg" runat="server" Texto="Por Oficina Organizativa" style="padding-top:0px; margin-top:0px;">
                                <div id="dvOficinaOrganizativa">
                                    <table>
                                        <tr>
                                            <td colspan="2">
                                                <asp:HiddenField ID="hdfOficinaOrganizativa" runat="server" Value="1"/>
                                                <asp:DropDownList ID="ddlOficinaOrganizativa" runat="server" CssClass="ddlNormal">
                                                    <asp:ListItem Text="Organización" Value="1"></asp:ListItem>
                                                    <asp:ListItem Text="Centro de costo" Value="2"></asp:ListItem>
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div id="btnOrganizacion" class="btnNormal" runat="server">
                                                    <img alt="Organizacion" src="../../Common/Images/Mantenimiento/Organizacion.png" />
                                                </div>
                                            </td>
                                            <td>
                                                <asp:ListBox ID="lstOrganizacion" runat="server" Width="350px" Height="76px" SelectionMode="Multiple"></asp:ListBox>
                                            </td>
                                            <td valign="middle" >
                                                <div id="btnQuitarOrganizacion" class="btnNormal" runat="server" style="width:80px;">
                                                    <table border="0" cellpadding="0" cellspacing ="0">
                                                    <tr>
                                                        <td>
                                                        <asp:Image ID="imgQuitarOrganizacion" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                                    </td>
                                                    <td>
                                                        <a>&nbsp;Quitar</a>
                                                    </td>
                                                    </tr>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </cc1:ContenedorAccodion>
                        </cc1:AccordionJQ>
                    </cc1:ContenedorAccodion>
                    <cc1:ContenedorAccodion Texto="Modelos"  style="padding-top:0px; margin-top:0px;"  runat="server" ID="accordModelo">
                        <div id="dvMensajeModelos" runat="server" style="display:none;">
                            <asp:Label ID="lblMensajeModelos" runat="server" Text="Debe grabar el Grupo Empleado antes de agregar Modelos"></asp:Label>
                        </div>
                        <table id="tbAgregarModelos" runat="server" border="0">
                            <tr>
                                <td>
                                    <div id="dvModelosCabecera" runat="server" class="dvPanel" style=" height:30px; margin-right:5px; margin-bottom:5px;" >
                                        <%--<span style="position:relative; top:-30px; left:0px; background-color:White; font-weight:bold;"> Acciones </span>--%>
                                        <table border="0" cellpadding="0" cellspacing ="1">
                                          <tr>
                                            <td>
                                                <div id="btnAgregarModelo" class="btnNormal" runat="server" title="Agregar">
                                                    <asp:Image ID="imgAgregarModelo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" /> Agregar
                                                </div>
                                            </td>
                                            <td>
                                                <div id="btnEliminarModelo" class="btnNormal" runat="server" title="Quitar">
                                                    <asp:Image ID="imgEliminarModelo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" /> Quitar
                                                </div>
                                            </td>
                                          </tr>
                                        </table>    
                                    </div>
                                    <div id="dvBusquedaModelos" runat="server" style="display:none;">
                                        <uc1:BusquedaPrincipal ID="bpBusquedaModelos" runat="server" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table id="tbModelos">
                                    </table>
                                    <div id="tbModelosPager"></div>
                                </td>
                            </tr>
                        </table>
                    </cc1:ContenedorAccodion>
                    <cc1:ContenedorAccodion Texto="Fecha Ingreso" style="padding-top:0px; margin-top:0px;" runat="server" ID="accordFecha">                            
                        <div id="dvMiscelanea">
                            <table>
                                <tr>
<%--                                    <td>
                                        <div class="dvPanel" style="height:150px; width:250px; display:none;">
                                            <table>
                                                <tr>
                                                    <td>
                                                        <table>
                                                            <tr>
                                                                <td>
                                                                    <asp:CheckBox ID="chkOperador" runat="server" ToolTip="Marcar/Desmarcar todos"/>
                                                                </td>
                                                                <td style="font-weight:bold;">
                                                                    Operadores
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div style="overflow:auto; height:110px; width:240px;">
                                                            <asp:CheckBoxList ID="chklstOperador" runat="server"></asp:CheckBoxList>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table> 
                                        </div>
                                    </td>--%>
                                   <td valign="top">
                                        <div class="dvPanel">
                                            <table>
                                                <tr>
                                                    <td style="font-weight:bold;">
                                                        <asp:CheckBox ID="chkFecha" runat="server" ToolTip="" Checked="true"/> Por días
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Del:
                                                    </td>
                                                    <td>
                                                        <%--<input type="text" id="txtDiaInicial2" runat="server" class="txtFecha" style="width:75px" />--%>
                                                        <asp:TextBox ID="txtDiaInicial" runat="server" Width="85px" CssClass="txtFecha"></asp:TextBox>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Al:
                                                    </td>
                                                    <td>
                                                        <asp:TextBox ID="txtDiaFinal" runat="server" Width="85px" CssClass="txtFecha"></asp:TextBox>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                    <td valign="top">
                                        <div class="dvPanel">
                                            <table>
                                                <tr>
                                                    <td style="font-weight:bold;">Estados</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <asp:DropDownList ID="ddlEstado" runat="server" Width="150px"></asp:DropDownList>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                    <td valign="top">
                                        <div class="dvPanel">
                                            <table>
                                                <tr>
                                                    <td style="font-weight:bold;">Tipo de Línea</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <asp:DropDownList ID="ddlLineaTipo" runat="server" Width="150px"></asp:DropDownList>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>                                    
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </cc1:ContenedorAccodion>                    
                    <cc1:ContenedorAccodion Texto="Cuenta" style="padding-top:0px; margin-top:0px;" runat="server" ID="accordCuenta">        
                        <div class="dvPanel" style="width:405px;">
                            <table>
                                <tr>
                                    <td style="font-weight:bold;">
                                        Operador
                                    </td>
                                    <td>
                                        <asp:DropDownList ID="ddlOperador" runat="server" CssClass="ddlNormal"></asp:DropDownList>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <table>
                                            <tr>
                                                <td>
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <asp:CheckBox ID="chkCuenta" runat="server" ToolTip="Marcar/Desmarcar todos"/>
                                                            </td>
                                                            <td style="font-weight:bold;">
                                                                Cuentas
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div style="overflow:auto; height:110px; width:390px;">
                                                        <asp:CheckBoxList ID="chklstCuenta" runat="server"></asp:CheckBoxList>                                                     
                                                    </div>
                                                </td>
                                            </tr>
                                        </table> 
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </cc1:ContenedorAccodion>
                </cc1:AccordionJQ>
            </div>
            <div style="float:left; width:70px; padding-left:10px; margin-top:20px;">        
                <%--<div id="btnGuardar" class="btnNormal" runat="server" style="width:70px; margin-bottom:5px;">
                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                    <a>Guardar</a>
                </div>--%>
                <%--<div id="btnEditar" class="btnNormal" runat="server" style="width:70px; margin-bottom:5px; display: none;">
                    <asp:Image ID="imgEditar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                    <a>Guardar</a>
                </div>--%>
                <%--<div id="btnGuardarComo" class="btnNormal" runat="server" style="width:70px; margin-bottom:5px; display: none;">
                    <asp:Image ID="imgGuardarComo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                    <a>Guardar Como</a>
                </div>--%> 
                <div id="btnEjecutar" class="btnNormal" runat="server" style="width:70px; margin-bottom:5px;">
                    <%--<asp:Image ID="imgEjecutar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Ejecutar.png" />--%>
                    <img src="../../Common/Images/Mantenimiento/Imprimir.gif" alt="Imprimir"/>
                    <a>Imprimir</a>
                </div>
                <div id="btnLimpiar" class="btnNormal" runat="server" style="width:70px; margin-bottom:5px;">
                    <img src="../../Common/Images/Mantenimiento/Borrar.png" alt="Borrar"/>
                    <a>Limpiar criterios</a>
                </div>
                <div id="btnCancelar" class="btnNormal" runat="server" style="width:70px; margin-bottom:5px; display:none;">
                    <asp:Image ID="imgCancelar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Cancelar.png" />
                    <a>Cancelar</a>
                </div>
            </div>
        </div>
        <div id="dvArea" style="display:none;padding:0px; margin:0px;">
            <iframe id="ifArea" width="910" height="470" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>
        <div id="dvCCO" style="display:none;padding:0px; margin:0px;">
            <iframe id="ifCCO" width="590" height="440" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>
<%--        <div id="dvContAcordeon">
                <cc1:AccordionJQ ID="AccordionJQ1" runat="server" CssClass="accordion">
                    <cc1:ContenedorAccodion ID="AcordionServicios"  Texto="Servicios Adicionales">
                        <div id="dvMensajeOperador" runat="server" >
                            <asp:Label ID="lblMensaje2" runat="server" Text="Debe seleccionar un Operador para poder visualizar los Servicios Adicionales"></asp:Label>
                        </div>
                        <table id="tbAgregarServicios" runat="server" border="0">
                            <tr>
                                <td>
                                    <table id="tbServiciosAdicionales">
                                    </table>
                                    <div id="tbServiciosAdicionalesPager"></div>
                                </td>
                            </tr>
                        </table>
                    </cc1:ContenedorAccodion>
                </cc1:AccordionJQ>
        </div>--%>


    </form>
</body>
</html>
