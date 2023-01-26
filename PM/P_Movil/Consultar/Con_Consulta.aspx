<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Consultar_Con_Consulta" Codebehind="Con_Consulta.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.accordion.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    <%--kendo --%>
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/KendoUI/kendo.blueopal.min.css" rel="stylesheet"
        type="text/css" />
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/kendo.datetimepicker.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/KendoUI/cultures/kendo.culture.es-ES.min.js" type="text/javascript"></script>

    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Entidades/ENT_MOV_IMP_Criterio.js" type="text/javascript"></script>
    <script src="Con_Consulta.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfCod" runat="server" />
        <asp:HiddenField ID="hdfCodAre" runat="server" />
        <asp:HiddenField ID="hdfNumCri" runat="server" />
        <asp:HiddenField ID="hdfEmpSel" runat="server" />
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <asp:HiddenField ID="hdfRes" runat="server" />
        
        <asp:HiddenField ID="hdfCodOrganizacion" runat="server" />
        <asp:HiddenField ID="hdfAdmin" runat="server" />

        <div id="dvCargando" class="dvCargando"></div>
        <div id="dvCargandoInicial" class="ui-widget-content ui-corner-all" style="position:fixed; left:50%; top:50%; padding:10px; z-index:1000; width:128px; height:70px; text-align:center;">
            <img alt="Cargando" src="../../Common/Images/Mantenimiento/Cargando.gif"/>
            <br />
            Cargando...
        </div>
        <div id="divMsgConfirmacion" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            <asp:Label ID="lblMensajeConfirmacion" runat="server" Text="¿Desea guardar los cambios ?"></asp:Label>
        </div>
        <div id="dvContenido" style="display:none;">
            <cc1:TabJQ runat="server" ID="TabDetalle" CssClass="tabs" style="margin-top:1px;" BorderStyle="None" BorderWidth="0">
                <cc1:ContenedorTabJQ Titulo="Criterios">
                    <div id="dvContAcordeon" style="float:left; margin-top:10px;  ">
                        <cc1:AccordionJQ runat="server" CssClass="accordion">
                            <cc1:ContenedorAccodion Texto="Tipo de consulta" >
                                <table>
                                    <tr>
                                        <td>
                                            <div class="dvPanel">
                                                <asp:RadioButtonList ID="rblstTipoConsulta" runat="server" CellPadding="0" CellSpacing="0">
                                                    <asp:ListItem Text="Reporte" Value="1" Selected="True"></asp:ListItem>
                                                    <asp:ListItem Text="Sumario" Value="2"></asp:ListItem>
                                                    <asp:ListItem Text="Desconocido" Value="3"></asp:ListItem>
                                                    <asp:ListItem Text="Ranking" Value="4"></asp:ListItem>
                                                    <%--<asp:ListItem Text="Resumen" Value="5"></asp:ListItem>--%>
                                                </asp:RadioButtonList>
                                            </div>
                                        </td>
                                        <td id="tdCriteriosAdicionales" class="CriteriosAdicionales" runat="server" style="display:none;">
                                            <div class="dvPanel" style="width:300px;">
                                                <table>
                                                    <tr>
                                                        <td style="font-weight:bold;">
                                                            Criterios extra
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div id="dvRanking" runat="server" style="display:none; margin-top:5px;">
                                                                Nivel: 
                                                                <asp:DropDownList ID="ddlNivelRanking" runat="server" CssClass="ddlNormal"></asp:DropDownList>
                                                            </div>
                                                            <div id="dvSumario" runat="server"  style="display:none; margin-top:5px;">
                                                                Tipo de sumario:
                                                                <asp:DropDownList ID="ddlTipoSumario" runat="server" CssClass="ddlNormal" Width="150px">
                                                                    <asp:ListItem Text="<Seleccionar>" Value="-1"></asp:ListItem>
                                                                    <asp:ListItem Text="Por Niveles" Value="1"></asp:ListItem>
                                                                    <asp:ListItem Text="Por Área" Value="2"></asp:ListItem>
                                                                    <asp:ListItem Text="Por Líneas" Value="3"></asp:ListItem>
                                                                    <asp:ListItem Text="Por Empleados" Value="4"></asp:ListItem>
                                                                    <asp:ListItem Text="Por Centro de Costo" Value="5"></asp:ListItem>
                                                                    <asp:ListItem Text="Por Números" Value="6"></asp:ListItem>
                                                                    <asp:ListItem Text="Por Frecuencia de Llamadas" Value="7"></asp:ListItem>
                                                                    <%--<asp:ListItem Text="Por Compañías" Value="8"></asp:ListItem>--%>
                                                                    <asp:ListItem Text="Por Operador" Value="8"></asp:ListItem>
                                                                    <asp:ListItem Text="Por País" Value="9"></asp:ListItem>
                                                                    <asp:ListItem Text="Por Ciudad" Value="10"></asp:ListItem>
                                                                    <asp:ListItem Text="Por Fecha" Value="11"></asp:ListItem>
                                                                    <asp:ListItem Text="Por Hora" Value="12"></asp:ListItem>
                                                                </asp:DropDownList>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div id="dvCriterioExtra" runat="server"  style="display:none;">
                                                                <div id="dvNivelSumario" runat="server"  style="display:none;">
                                                                    Nivel:
                                                                    <asp:DropDownList ID="ddlNivelSumario" runat="server" CssClass="ddlNormal" Width="150px"></asp:DropDownList>
                                                                </div>
                                                                <div id="dvAreaSumario" runat="server"  style="display:none;">
                                                                    <div id="btnSeleccionarArea" class="btnNormal" runat="server">
                                                                        <asp:Image ID="imgSeleccionarArea" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Todo.png"/>
                                                                        <a>Seleccionar Área</a>
                                                                    </div>
                                                                    <asp:Label ID="lblAreaSumario" runat="server" Text=""></asp:Label>
                                                                    <div id="dvAreaSumarioDet" style="display:none;">
                                                                        <iframe id="ifAreaSumario" frameborder="0" style="padding:0px; margin:0px;" ></iframe>
                                                                    </div>
                                                                </div>
                                                                <div id="dvPaisSumario" runat="server" style="display:none;">
                                                                    País:
                                                                    <asp:DropDownList ID="ddlPaisSumario" runat="server" CssClass="ddlNormal" Width="150px"></asp:DropDownList>
                                                                </div>
                                                            </div>                                    
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </table>        
                            </cc1:ContenedorAccodion>
                            <cc1:ContenedorAccodion Texto="Organización" style="padding-top:0px; margin-top:0px;">
                                <cc1:AccordionJQ runat="server" CssClass="accordion">
                                    <cc1:ContenedorAccodion Texto="Por Empleado" style="padding-top:0px; margin-top:0px;">
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
                                    <cc1:ContenedorAccodion Texto="Por Línea" style="padding-top:0px; margin-top:0px;">
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
                            <cc1:ContenedorAccodion Texto="Fechas y Servicios" style="padding-top:0px; margin-top:0px;">                            
                                <div id="dvMiscelanea">
                                    <table>
                                        <tr>
                                            <td>
                                                <div class="dvPanel">
                                                    <table>
                                                        <tr>
                                                            <td style="font-weight:bold;">
                                                                Por días
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Del:
                                                            </td>
                                                            <td>
                                                                <%--<input type="text" id="txtDiaInicial2" runat="server" class="txtFecha" style="width:75px" />--%>
                                                                <asp:TextBox ID="txtDiaInicial" runat="server" Width="75px" CssClass="txtFecha"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Al:
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtDiaFinal" runat="server" Width="75px" CssClass="txtFecha"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="dvPanel">
                                                    <table>
                                                        <tr>
                                                            <td style="font-weight:bold;">
                                                                Por horas
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Desde:
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtHoraInicial" runat="server" Width="90px" CssClass="txtFechaKendo" Text="00:00:00"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                        <tr> 
                                                            <td>
                                                                Hasta:
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtHoraFinal" runat="server" Width="90px" CssClass="txtFechaKendo" Text="23:59:59"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>                            
                                            </td>
                                            <td>
                                                <div class="dvPanel">
                                                    <table>
                                                        <tr>
                                                            <td style="font-weight:bold;">
                                                                 Por tiempo
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Desde:
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtTiempoMayor" runat="server" Width="90px" CssClass="txtFechaKendo" Text="00:00:00"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Hasta:
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtTiempoMenor" runat="server" Width="90px" CssClass="txtFechaKendo" Text="00:00:00"></asp:TextBox>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>                            
                                            </td>
                                            <td>                                         
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="dvPanel" style="width:340px; height: 220px;">                                
                                    <table >
                                        <tr>
                                            <td style="font-weight:bold;">
                                                Por tipo de llamada
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlGlobal" runat="server" CssClass="ddlNormal"></asp:DropDownList>  
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
                                                                        <asp:CheckBox ID="chkServicio" runat="server" ToolTip="Marcar/Desmarcar todos"/>
                                                                    </td>
                                                                    <td style="font-weight:bold;">
                                                                        Servicios
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div style="overflow:auto; height:150px; width:320px;">
                                                                <asp:CheckBoxList ID="chklstServicio" runat="server"></asp:CheckBoxList>                                                 
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table> 
                                            </td>
                                        </tr>
                                    </table>
                                </div>   
                            </cc1:ContenedorAccodion>
                            <cc1:ContenedorAccodion Texto="Número" style="padding-top:0px; margin-top:0px;">
                                <div id="dvCentral">
                                <table>
                                    <tr>
                                        <td colspan="3">                            
                                            <div style="width:100%; text-align:left; font-weight:bold;">
                                                Por número llamado
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id="btnNumeroLlamado" class="btnNormal" runat="server" title="Seleccione los números llamados">
                                                <img alt="Numero" src="../../Common/Images/Mantenimiento/Numero.png" />
                                            </div>
                                        </td>
                                        <td>
                                            <asp:ListBox ID="lstNumeroLlamado" runat="server" Width="350px" Height="76px"></asp:ListBox>
                                        </td>
                                        <td>
                                            <div id="btnQuitarNumeroLlamado" class="btnNormal" runat="server" style="width:80px;">
                                                <table border="0" cellpadding="0" cellspacing ="0">
                                                <tr>
                                                <td>
                                                <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
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
                            <cc1:ContenedorAccodion Texto="Telefonía" style="padding-top:0px; margin-top:0px;">
                                <table>
                                    <tr>
                                        <td style="width:250px;">
                                            <div class="dvPanel" style="height:150px;">
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
                                        </td>
                                        <td valign="top">
                                            <div class="dvPanel">
                                                <table>
                                                    <tr>
                                                        <td style="font-weight:bold;">Tipo de llamada</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <asp:RadioButtonList ID="rblstTipoLlamada" runat="server" CellPadding="0" CellSpacing="0"></asp:RadioButtonList>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>                                    
                                        </td>
                                        <td valign="top">
                                            <div class="dvPanel">
                                                <table>
                                                    <tr>
                                                        <td style="font-weight:bold;">Telefonía</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <asp:RadioButtonList ID="rblstTelefonia" runat="server" CellPadding="0" CellSpacing="0"></asp:RadioButtonList>
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
                                                            <asp:DropDownList ID="ddlLineaTipo" runat="server"></asp:DropDownList>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>                                    
                                        </td>
                                    </tr>
                                </table>
                            </cc1:ContenedorAccodion>
                            <cc1:ContenedorAccodion Texto="Sucursal" style="padding-top:0px; margin-top:0px;">
                                <table>
                                    <tr>
                                        <td style="width:250px;">
                                            <div class="dvPanel" style="height:150px;">
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <table>
                                                                <tr>
                                                                    <td>
                                                                        <asp:CheckBox ID="chkSucursalOrigen" runat="server" ToolTip="Marcar/Desmarcar todos"/>
                                                                    </td>
                                                                    <td style="font-weight:bold;">
                                                                        Sucursal origen
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div style="overflow:auto; height:110px; width:240px;">
                                                                <asp:CheckBoxList ID="chklstSucursalOrigen" runat="server"></asp:CheckBoxList>                                                        
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table> 
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </cc1:ContenedorAccodion>
                            <cc1:ContenedorAccodion Texto="Cuenta" style="padding-top:0px; margin-top:0px;">        
                                <div class="dvPanel" style="width:405px;">
                                    <table>
                                        <tr>
                                            <td style="font-weight:bold;">
                                                Operador
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlOperador" runat="server" CssClass="ddlNormal" Enabled = "false" ></asp:DropDownList>
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
                        <div id="btnGuardar" class="btnNormal" runat="server" style="width:70px; margin-bottom:5px;">
                            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Guardar</a>
                        </div>
                        <div id="btnEditar" class="btnNormal" runat="server" style="width:70px; margin-bottom:5px; display: none;">
                            <asp:Image ID="imgEditar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                            <a>Guardar</a>
                        </div>
                        <div id="btnGuardarComo" class="btnNormal" runat="server" style="width:70px; margin-bottom:5px; display: none;">
                            <asp:Image ID="imgGuardarComo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Guardar Como</a>
                        </div>
                        <div id="btnEjecutar" class="btnNormal" runat="server" style="width:70px; margin-bottom:5px;">
                            <asp:Image ID="imgEjecutar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Ejecutar.png" />
                            <a>Ejecutar consulta</a>
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
                </cc1:ContenedorTabJQ>
            </cc1:TabJQ>
        </div>

        <div id="dvNombre" style="display:none;">
            <table width="350px;">
                <tr>
                    <td colspan="2">
                        <asp:CheckBox ID="chkCompartir" runat="server" Text="Compartir consulta con otros usuarios"/>
                    </td>
                </tr>
                <tr>
                    <td style="width:100px;">
                        Nombre de criterio
                    </td>
                    <td>
                        <asp:TextBox ID="txtNombre" runat="server" Width="200px"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>

        <div id="dvGuardarComo" style="display:none;">
            <table width="350px;">
                <tr>
                    <td colspan="2">
                        <asp:CheckBox ID="chkCompartirComo" runat="server" Text="Compartir consulta con otros usuarios"/>
                    </td>
                </tr>
                <tr>
                    <td style="width:100px;">
                        Nombre de criterio
                    </td>
                    <td>
                        <asp:TextBox ID="TxtNombreComo" runat="server" Width="200px"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>

        <div id="dvNumeroLlamado" style="display:none;padding:0px; margin:0px;">
            <iframe id="ifNumeroLlamado" width="315" height="335" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>
        <%--<div id="dvArea" style="display:none;padding:0px; margin:0px;">
            <iframe id="ifArea" width="730" height="470" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>
        <div id="dvCCO" style="display:none;padding:0px; margin:0px;">
            <iframe id="ifCCO" width="470" height="340" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>--%>
    </form>
</body>
</html>
