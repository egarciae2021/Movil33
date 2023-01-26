<%@Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Configurar_Conf_DistribucionMinutos" Codebehind="Conf_DistribucionMinutos.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%--<%@Register src="../../Common/Controles/ExportarExcelGenerico.ascx" tagname="ExportarExcelGenerico" tagprefix="uc1" %>--%>
<%@ Register Src="../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
   <%-- <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Entidades/ENT_MOV_Parametros.js" type="text/javascript"></script>
--%>
     <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
     
    <link href="../../Common/Styles/Principal.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css"  />
    
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript" ></script>

    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
        
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.tabs.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.accordion.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.resizable.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.datepicker.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/i18n/jquery.ui.datepicker-es.js" type="text/javascript"></script>
    
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <link href="../../Common/Styles/KendoUI/kendo.uniform.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/KendoUI/kendo.web.min.js" type="text/javascript"></script>
    <link href="../../Common/Styles/KendoUI/kendo.common.min.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/KendoUI/cultures/kendo.culture.es-PE.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/FusionCharts/FusionCharts.js" type="text/javascript"></script>

    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>

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

    <script src="Conf_DistribucionMinutos.js" type="text/javascript"></script>   

    <link href="../../Common/Styles/dhtmlxtree.css" rel="stylesheet" type="text/css" />

    <script src="../../Common/Scripts/dhtmlx/dhtmlxcommon.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/dhtmlx/dhtmlxtree.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/dhtmlx/ext/dhtmlxtree_json.js" type="text/javascript"></script>
       
    
  <style type="text/css" >
      
    .ColumnGrillaLlamadas
    {
        background-color:#FBEC88;
    }
    .ColumnGrilla
    {
        background-color:#EFF8FB;
    }
    .ColumnGrillaLinea
    {
        color:navy;
    }        
    .ui-state-hidden{
			display: none;
	}
	.ColumnGrillaEditada
    {
        background-color:#EFF8FB;
    }
    .ColumnaLineaAlta
    {
        background: #BCC1F4; /* Old browsers */
        background: -moz-linear-gradient(top,  #BCC1F4 0%, #BCC1F4 100%); /* FF3.6+ */
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#BCC1F4), color-stop(100%,#BCC1F4)); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(top,  #BCC1F4 0%,#BCC1F4 100%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(top,  #BCC1F4 0%,#BCC1F4 100%); /* Opera 11.10+ */
        background: -ms-linear-gradient(top,  #BCC1F4 0%,#BCC1F4 100%); /* IE10+ */
        background: linear-gradient(to bottom,  #BCC1F4 0%,#BCC1F4 100%); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#BCC1F4', endColorstr='#BCC1F4',GradientType=0 ); /* IE6-9 */
        font-weight:bolder;
    }
    .ColumnaLineaBaja
    {
        background: #FFA7A7; /* Old browsers */
        background: -moz-linear-gradient(top,  #9F1E1E 0%, #9F1E1E 100%); /* FF3.6+ */
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#9F1E1E), color-stop(100%,#9F1E1E)); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(top,  #FFA7A7 0%,#FFA7A7 100%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(top,  #FFA7A7 0%,#FFA7A7 100%); /* Opera 11.10+ */
        background: -ms-linear-gradient(top,  #FFA7A7 0%,#FFA7A7 100%); /* IE10+ */
        background: linear-gradient(to bottom,  #FFA7A7 0%,#FFA7A7 100%); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#FFA7A7', endColorstr='#FFA7A7',GradientType=0 ); /* IE6-9 */
        font-weight:bolder;
    }
    .ColumnaLineaExcepcion
    {
        background: #9FE59A; /* Old browsers */
        background: -moz-linear-gradient(top,  #9FE59A 0%, #9FE59A 100%); /* FF3.6+ */
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#9FE59A), color-stop(100%,#9FE59A)); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(top,  #9FE59A 0%,#9FE59A 100%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(top,  #9FE59A 0%,#9FE59A 100%); /* Opera 11.10+ */
        background: -ms-linear-gradient(top,  #9FE59A 0%,#9FE59A 100%); /* IE10+ */
        background: linear-gradient(to bottom,  #9FE59A 0%,#9FE59A 100%); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#9FE59A', endColorstr='#9FE59A',GradientType=0 ); /* IE6-9 */
        font-weight:bolder;
    }
    .Leyenda
    {
        float:left;
        width:12px;
        height:12px;
        border-radius:3px;
    }
  </style> 

</head>
<body>

    <form id="form1" runat="server"  onfocusout="OnFocusOutForm(event)">

    <div id="dvSinCuenta" class="AnchoTotal" style="display: none;">
        <br />
        <div style="font-size: x-large; color: Gray;">
            <b>No se ha configurado cuentas por distribución, No hay datos para mostrar.</b></div>
    </div>
    
    <div id="dvCargandoDistribucion" style="background-color:White; width:100%; height:100%; position:fixed; z-index:1000;"></div>
    <div id="dvPrincipal">
    <div id="dvPeriodoCopiar" style="display:none;">
        <div style="width:100%; margin-bottom:10px;">
            Se generará una copia de la distribución seleccionada. La cuenta, tipo de distribución y los montos serán duplicados a una nueva disribución.
        </div>
        <div style="width:100%; margin-bottom:10px; display:none;">
            Seleccione el nuevo periodo a generar
        </div>
        <div>
            Periodo a generar:&nbsp;&nbsp;&nbsp;
            <asp:TextBox ID="txtPeriodoCopiar" runat="server" CssClass="MESANHO" MaxLength="7" Width="100px"></asp:TextBox>
        </div>
    </div>
    <!-- DIV FILTRO ESTADOS -->
    <div id="dvEstadoPeriodo" class="dvPanel" style="display:none; width:75px;height:55px; position:absolute; left:0px;top:0px; z-index:999999;">
        <table width ="100%" border="0" cellpadding ="0" cellspacing ="0" style="height:15px">
            <tr>
                <td>
                    <asp:RadioButton ID="rbtnActivos" runat="server" Text="Activos" GroupName="rbtnFiltroRegistro" Checked="true"  />
                </td>
            </tr>
            <tr>
                <td>
                    <asp:RadioButton ID="rbtnInactivos" runat="server" Text="Inactivos" GroupName="rbtnFiltroRegistro"/>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:RadioButton ID="rbtnTodos" runat="server" Text="Todos" GroupName="rbtnFiltroRegistro"/>
                </td>
            </tr>
        </table>
    </div>

    <!-- ========================================================================================
            DIV ORGANIZACION
    ========================================================================================-->
    <div id="dvFiltros" class="dvPanel" style="display:none; width:340px;height:325px; position:absolute; left:0px;top:0px; z-index:999999;">
        <table width ="100%" border="0" cellpadding ="0" cellspacing ="0" >
            <tr>
                <td>
                    <input id="chOmitir" type="checkbox" /> <label id="lblomitir" for="lblomitir_" runat="server"> Omitir Registros sin empleado asociado </label>
                </td>
                <td>
                    <a id="btnTodosOrga" href="#">Todos</a>
                </td>
                <td>
                    <a id="btnCerrarOrga" href="#">Cerrar</a>
                </td>
            </tr>
            <tr><td>&nbsp;</td></tr>            
            <tr>
                <td colspan="3">
                    <div id="dvOrganizacion" class="dhtmlxTree dvPanel"  style="width:320px; height:260px;overflow:auto;"></div>
                </td>
            </tr>
            <tr id="trFiltroMinAsig" style="display:none;">
                <td colspan="3" style="padding-top:5px;">
                    <asp:CheckBox ID="chkCantMinAsig" Text="Mostrar líneas con distribución menor o igual a:" runat="server" />
                    <%--<input id="chkCantMinAsig" type="checkbox"/>
                    <label id="Label7" for="chkCantMinAsig">Mostrar distribución menor o igual a: </label>--%>
                    <asp:TextBox ID="txtCantMinAsig" runat="server" Width="30px" MaxLength="4" Enabled="false"></asp:TextBox>
                    <div id="btnAplicarFiltro" runat="server" class="btnNormal" style="float:right; height:21px;" title="Aplicar filtros">
                        <asp:Image ID="Image42" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Filtro_16x16.png" />
                    </div>
                </td>
            </tr>
        </table>
    </div>

 <!-- ========================================================================================
            tablas importadas
    ========================================================================================-->
    <%--<div id="dvImportacion" class="dvPanel" style="display:none; width:245px;height:215px; position:absolute;z-index:999999;">--%>
    <div id="dvImportacion" style="display:none;">
        <table id="tbPeriodosCreados"></table>
        <%--<table width ="100%" border="0" cellpadding ="0" cellspacing ="0" >            
            <tr >
                <td style=" width:120px;">
                   
                </td>
                <td style=" width:40px;">
                </td>
                <td style=" width:40px;">
                        
                </td>
                <td style=" width:40px;">
                        <a id="btnCerrarImportacion" href="#">Aplicar</a>
                </td>
            </tr>
            <tr><td>&nbsp;</td></tr>
            <tr>
                <td colspan="4">
                    
                </td>
            </tr>   
        </table>--%>
    </div>

    
        <!-- VARIABLES -->
        <asp:HiddenField ID="hdfidPeriodo" runat="server" />
        <asp:HiddenField ID="hdfidOperador" runat="server" />
        <asp:HiddenField ID="hdfidCuenta" runat="server" />
        <asp:HiddenField ID="hdfvcPeriodo" runat="server" />
        <asp:HiddenField ID="hdfidTipoDis" runat="server" />
        <asp:HiddenField ID="hdfvcFiltroDetalle" runat="server" />
        <asp:HiddenField ID="hdfArchivo" runat="server" />
        <asp:HiddenField ID="hdfGuidNomTabTemp" runat="server" />
        <asp:HiddenField ID="hdfidSubCuenta" runat="server" />
        <asp:HiddenField ID="hdfLineaQuitar" runat="server" />

        <div id="dvCargando" class="dvCargando"></div>
        <table align="left">
            <tr>
                <td>
                    <cc1:TabJQ ID="tabOpciones" runat="server" CssClass="tabs" Style="margin: 0px; padding: 0px;width:930px;" >
                        <cc1:ContenedorTabJQ ID="tabDetalle" Titulo="Detalle" CssClass="dvTabContenido" Height="100%">
                            <table id="tbVerPeriodo" style="width: 930px;margin: 4px; padding: 4px;"  border="0" align="left" >
                                <tr>
                                    <td style="padding-right:10px; width:120px;" >
                                        <table id="dvAcciones" cellpadding="0" cellspacing="0"><tr><td>
                                            <div id="btnNuevo" class="btnNormal" title="Nuevo Periodo">
                                                <asp:Image ID="Image11" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                            </div>
                                        </td><td>
                                            <div id="btnEditar" class="btnNormal" title="Editar Periodo">
                                                <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                            </div>
                                        </td><td>
                                            <div id="btnEliminar" class="btnNormal" title="Anular Periodo">
                                                <asp:Image ID="Image12" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif" />
                                            </div>
                                        </td></tr></table>
                                    </td>
                                    <td style="padding-right:10px; width:80px;">
                                        <table id="dvEstado" cellpadding="0" cellspacing="0"><tr><td>
                                            <div id="btnActivar" class="btnNormal" title="Activar Periodo">
                                                <img id="img2" src="../../Common/Images/Mantenimiento/Activar_16x16.png">
                                            </div>
                                        </td><td>
                                            <div id="btnEstadoPeriodo" class="btnNormal" title="Ver Estados">
                                                <img id="img1" src="../../Common/Images/Mantenimiento/VistaDetalle.png">
                                            </div>
                                        </td></tr></table>
                                    </td>
                                    <td style="padding-right:10px; width:120px;">
                                        <table id="dvAvanzada" cellpadding="0" cellspacing="0"><tr><td>
                                            <div id="btnGenerarCopia" class="btnNormal" title="Generar Copia de Periodo">
                                                <asp:Image ID="Image13" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Volcar.gif" />
                                            </div>
                                        </td><td>
                                            <div id="btnExportarPeriodo" class="btnNormal" title="Exportar Periodos">
                                                <asp:Image ID="Image15" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Excel16.png" />
                                            </div>
                                        </td><td>
                                            <div id="btnVerCuenta" class="btnNormal" title="Ver Cuenta Bolsa">
                                                <asp:Image ID="Image16" runat="server" ImageUrl="~/Common/Images/Mantenimiento/VerDetalle.png" />
                                            </div>                                                    
                                        </td></tr></table>
                                    </td>
                                    <td style="padding-right:10px; width:80px;">
                                        <table id="dvProceso" cellpadding="0" cellspacing="0"><tr><td>
                                            <div id="btnEnviar" class="btnNormal" title="Enviar al Operador">
                                                <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/EnviarCorreo.png" />
                                            </div>
                                        </td><td>
                                            <div id="btnCerrarDist" class="btnNormal" title="Cerrar Periodo">
                                                <asp:Image ID="Image14" runat="server" ImageUrl="~/Common/Images/Mantenimiento/lock_16x16.png" />
                                            </div>
                                        </td></tr></table>
                                    </td>
                                    <td style="padding-right:10px;">
                                        <table>
                                            <tr>
                                                <td style="width:50px">Filtro en</td>
                                                <td style="width:50px">
                                                    <asp:DropDownList id="ddlFiltroPeriodo" runat="server" Width="150" >
                                                    </asp:DropDownList>
                                                </td>
                                                <td style="width:50px;text-align:center">Filtrar</td>
                                                <td>
                                                    <asp:TextBox id="txtFiltroPeriodo" runat="server" Width="90" ToolTip="(Presionar ENTER para buscar)"></asp:TextBox>
                                                    <asp:DropDownList ID="ddlFiltroEstPro" runat="server" style="display:none;" Width="120"></asp:DropDownList>
                                                    <asp:DropDownList ID="ddlFiltroTipDis" runat="server" style="display:none;" Width="120"></asp:DropDownList>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr id="filaCabecera2">
                                    <td colspan="6"> 
                                        <table id="tbPeriodo"></table>
                                        <div id="pagerPeriodo"></div>
                                    </td>               
                                </tr>
                            </table>
                        </cc1:ContenedorTabJQ>
                        <cc1:ContenedorTabJQ ID="tabEditar" Titulo="Editar Periodo" CssClass="dvTabContenido" Height="100%">
                            <div id="Div1" style="float:left;">
                                <div class="dvPanel" style="margin-left: 5px; margin-top:10px; padding:2px; float:left; height:60px;">
                                    <span style="position: relative; top: -17px; left: 0px; background-color: White;
                                    font-weight: bold;">Datos Generales</span>
                                    <table style="position:relative; top:-13px;">
                                        <tr>
                                            <td align="left">
                                                Periodo                                    
                                            </td>                                            
                                            <td id="tdlblPeriodo">
                                                <asp:TextBox ID="lblPeriodo" runat="server"  Width="130px" MaxLength="7"></asp:TextBox>
                                            </td>
                                            <td id="tddtPeriodo">
                                                <asp:TextBox ID="txtPeriodo"  onkeypress="return isNumberKey(event)" runat="server" CssClass="MESANHO" Width="140px"  MaxLength="7"></asp:TextBox>
                                            </td>
                                            <td align="left">
                                                Tipo Dist.
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtTipoDist" runat="server" Width="180px"></asp:TextBox>
                                                <asp:DropDownList ID="ddlTipoDist" runat="server" Width="210px"></asp:DropDownList>
                                                <asp:Image ID="imgEditTipoDist" runat="server" CssClass="imgBtn" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" ToolTip="Editar Tipo de Distribución" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="left">
                                                Operador
                                            </td>
                                            <td id="tdTxtOperador">
                                                <asp:TextBox ID="txtOperador" runat="server" Width="180px"></asp:TextBox>
                                            </td>
                                            <td id="tdDdlOperador">
                                                <asp:DropDownList ID="ddlOperador" runat="server" Width="210px"></asp:DropDownList>
                                            </td>
                                            <td align="left">
                                                Cuenta
                                            </td>
                                            <td>
                                                <asp:TextBox ID="txtCuenta" runat="server" Width="180px"></asp:TextBox>
                                                <asp:DropDownList ID="ddlCuenta" runat="server" Width="210"></asp:DropDownList>                                          
                                                <asp:Image ID="imgDetCuenta" runat="server" CssClass="imgBtn" ImageUrl="~/Common/Images/Mantenimiento/VerDetalle.png" ToolTip="Ver Detalle Cuenta" />
                                            </td>
                                        </tr>                                        
                                    </table>
                                </div>
                                <div id="dvPanelFiltros" class="dvPanel" style="margin-left: 5px; margin-top:10px; padding:2px; float:left; height:60px;">
                                    <span style="position: relative; top: -17px; left: 0px; background-color: White;
                                    font-weight: bold;">Filtros</span>
                                    <table style="position:relative; top:-13px;">
                                        <tr>
                                            <td align="left">
                                                <asp:Label id="lblModo" runat="server" Text="Vista"></asp:Label>
                                            </td>
                                            <td id="tbModo">
                                                <asp:DropDownList ID="ddlModo" runat="server" Width="140px" style="position:relative; bottom:4px;"></asp:DropDownList>
                                                <asp:Image ID="imgAsignar" runat="server" CssClass="imgBtn" ImageUrl="~/Common/Images/Mantenimiento/Calc_24x24.png" ToolTip="Asignar Valores" style="position:relative; top:4px; display:none;"/>
                                                <ttgInfo:ToolTipGenerico ID="inforAsignar" runat="server" Mensaje="Asignar Valores permite distribuir minutos a todas las líneas de la distribución" />
                                            </td>
                                            <td>
                                                <table id="tbFiltrosExtras" style="display:none;">
                                                    <tr>
                                                        <td>
                                                            <input id="chkLinExcep" type="checkbox" onclick="MostrarLineasExceptuadas()" />
                                                        </td>
                                                        <td style="width:65px;">
                                                            <label id="lblLinExcep" for="chkLinExcep" title="Mostrar líneas con una asignación diferente a la distribuida mediante el tipo de distribución">Líneas con excepciones</label>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td  align="left">
                                                <asp:Label id="lblFiltro" runat="server" Text ="Filtrar"></asp:Label>
                                            </td>
                                            <td id="tdFiltro">
                                                <table cellpadding="0" cellspacing ="0" >
                                                    <tr valign="middle"  >
                                                        <td>
                                                            <asp:TextBox ToolTip="Buscar por Línea, Empleado o IMEI &#13; (presionar ENTER para buscar)" id="txtFiltro" runat="server" 
                                                            Width="130" MaxLength="40"></asp:TextBox>
                                                        </td>
                                                        <td>
                                                            <div id="btnFiltrar" class="btnNormal"  runat="server"  style=" height:20px;" title="Ver filtros de búsqueda" >
                                                                ...
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="dvPanel" style="margin-left: 5px; margin-top:10px; padding:2px; float:left; height:60px;">
                                    <span style="position: relative; top: -17px; left: 0px; background-color: White;
                                    font-weight: bold;">Acciones</span>
                                    <table style="position:relative; top:-13px;">
                                        <tr>
                                            <td>
                                                <div id="btnGuardar" class="btnNormal" runat="server" title="Guardar Nuevo Periodo"  >
                                                    <table cellpadding ="0" cellspacing ="0">
                                                        <tr>
                                                            <td><asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" /></td>
                                                            <td>&nbsp;&nbsp;<a>Guardar</a></td>
                                                        </tr>
                                                    </table>
                                                </div>
                                                <div id="btnExportar" class="btnNormal" runat="server" title="Genera archivo excel de líneas, sus datos y la asignación de minutos correspondiente"  click="AgregarRegistro">
                                                    <table cellpadding ="0" cellspacing ="0">
                                                        <tr>
                                                            <td><asp:Image ID="imgEliminar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/BajarArchivo.png" /></td>
                                                            <td>&nbsp;&nbsp;<a>Exportar</a></td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div id="btnImportar" class="btnNormal" runat="server" title="Subir archivo al servidor" click="EditarRegistro">
                                                    <table cellpadding ="0" cellspacing ="0">
                                                        <tr>
                                                            <td><asp:Image ID="Image5" runat="server" ImageUrl="~/Common/Images/Mantenimiento/SubirArchivo.png" /></td>
                                                            <td>&nbsp;&nbsp;<a>Importar</a></td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div id="dvLeyendaGrilla" style="float:left; margin-top:5px; margin-left:10px; width:100%; display:none;">
                                <div id="dvLeyendaAlta" class="Leyenda" style="background:#BCC1F4;"></div>
                                <div style="float:left; margin-left:3px; margin-right:20px;">
                                    <label id="lblLeyendaAlta"></label>
                                </div>
                                <div id="dvLeyendaBaja" class="Leyenda" style="background:#FFA7A7;"></div>
                                <div style="float:left; margin-left:3px; margin-right:20px;">
                                    <label id="lblLeyendaBaja"></label>
                                </div>
                                <div id="dvLeyendaDifDist" class="Leyenda" style="background:#9FE59A;"></div>
                                <div style="float:left; margin-left:3px; margin-right:20px;">
                                    <label id="lblLeyendaDifDist"></label>
                                </div>
                                <div id="dvFilCanAsig" style="float:right; margin-right:25px;">
                                </div>
                            </div>
                            <%--<div id="dvAccionBajas" style="display:none; float:right; margin-top:5px; margin-right:10px">
                                <a href="#" onclick="QuitarLineasBaja();" >Quitar todas las líneas de baja</a>
                            </div>--%>
                            <table style="width:915px;margin: 4px; padding: 4px;"  border="0" cellpadding="0" cellspacing ="0" >
                                <tr>
                                    <td colspan="10">
                                        <!-- LINEAS -->
                                        <div id="dvLinea" style="display:none; ">
                                            <table id="tbLinea"></table>
                                            <div id="pagerLinea"></div>
                                        </div>
                                        <!-- DISTRIBUCION AGRUPADA -->
                                        <div id="dvDistAgrup" style="display:none;">
                                            <table id="tbDistAgrup"></table>
                                            <div id="pagerDistAgrup"></div>
                                        </div>
                                        <!-- TOTALES -->
                                        <div id="tbTotales" style="margin:0px !important; padding:5px !important;display :none; text-align :center" >
                                            <table width="100%" style="margin-top:8px;"  border="0" cellpadding="0" cellspacing ="0" >
                                                <tr>
                                                    <td>
                                                        <div id="btnGuardarEditar" class="btnNormal" style="float:left;">
                                                            <asp:Image ID="Image4" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                                                            <a>Guardar</a>
                                                        </div>
                                                        <div id="btnCerrar" class="btnNormal" style="float:left;">
                                                            <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                                                            <a>Cerrar</a>
                                                        </div>
                                                    </td>
                                                    <td style="color:#0431B4">Cuenta Bolsa</td>
                                                    <td >
                                                        <%--<div class="dvPanel" style="margin:0px !important; padding:3px !important;" >--%>
                                                        <div class="dvPanel dvTotal" >
                                                            <label id="lblCuentaBolsa" style="color:#0431B4">0</label>
                                                        </div>
                                                    </td>
                                                    <td style="color:#B18904">Distribución Vigente</td>
                                                    <td >
                                                        <div class="dvPanel dvTotal" >
                                                            <label id="lblUltAsignacion" style="color:#B18904">0</label>
                                                        </div>
                                                    </td>
                                                    <td style="color:#0489B1" >Consumo Real</td>
                                                    <td >
                                                        <div class="dvPanel dvTotal" >
                                                            <label id="lblConsumido" style="color:#0489B1">0</label>
                                                        </div>
                                                    </td>
                                                    <td style="color:#088A08">Distribuido</td>
                                                    <td >
                                                        <div class="dvPanel dvTotal" >
                                                            <label id="lblTemporal"  style="color:#088A08">0</label>
                                                        </div>
                                                    </td>
                                                    <td > <label id="lblDisponible_" style="color:#8E236B">Disponible</label> </td>
                                                    <td >
                                                        <div id="dvFondoDisponible" class="dvPanel dvTotal" >
                                                            <label id="lblDisponible" style="color:#8E236B">0</label>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </cc1:ContenedorTabJQ>
                    </cc1:TabJQ>            
                </td>
            </tr>
        </table>
        
<!-- ========================================================================================
            EXPORTACION IMPORTACION
    ========================================================================================-->
    <div id="dvExportacionImportacion" style="display:none;padding:0px; margin:0px;overflow: hidden !important;">
            <iframe id="ifExportacionImportacion" runat="server" scrolling="no" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>

<!-- ========================================================================================
            DETALLE LINEAS
    ========================================================================================-->
    <div id="dvLineaDetalle" style="display:none; padding:0px; margin:0px;">
        <table>
            <tr>
                <td style="width:150px; text-align:center; padding-top: 12px; padding-bottom: 12px;">
                    Filtrar (Línea / Empleado) 
                </td>
                <td>
                    <asp:TextBox id="txtFiltroDetalle" ToolTip="(presionar ENTER para buscar)" runat="server" Width="150px" MaxLength="40"></asp:TextBox>
                </td>
                <td></td>
            </tr>
        </table>
        <table id="tbLineaDetalle"></table>    
        <div id="pagerLineaDetalle"></div>
        <div id="Div2" style="float:left; margin-top:10px; margin-left:10px; ">
            <div id="Div3" class="Leyenda" style="background:#BCC1F4;"></div>
            <div style="float:left; margin-left:3px; margin-right:20px;">
                <label id="Label6">Línea nueva</label>
            </div>
            <div id="Div4" class="Leyenda" style="background:#FFA7A7;"></div>
            <div style="float:left; margin-left:3px; margin-right:20px;">
                <label id="Label8">Línea de baja</label>
            </div>
            <div id="Div5" class="Leyenda" style="background:#9FE59A;"></div>
            <div style="float:left; margin-left:3px; margin-right:20px;">
                <label id="Label9">Excepción de distribución</label>
            </div>
        </div>
    </div>
        
<!-- ========================================================================================
                VER HISTORICO
    ========================================================================================-->
    <div id="dvHistorico" style="display:none; padding:0px; margin:0px;">
       <%-- <center style="padding-top:0px;">--%>
            <table id="tbHistorico" ></table>
       <%-- </center>--%>
    </div>

    <!-- ========================================================================================
                DETALLE CUENTA
    ========================================================================================-->
     <div id="dvValidaProcesar" style="display:none;padding:5px; margin:5px;">
            <table>
                <tr>
                    <td colspan="2">Debe seleccionar un servicio, al cual se aplicará los valores asignados</td>
                </tr>
                <tr>
                    <td><br /></td>
                </tr>
                <tr>
                    <td>Servicios</td>
                    <td> <asp:DropDownList ID="ddlServicio" runat="server" Width="200px"></asp:DropDownList></td>
                </tr>
            </table>
        </div>

    <!-- ========================================================================================
                DETALLE CUENTA
    ========================================================================================-->
    <div id="dvDetalleCuenta" style="display:none; padding:0px; margin:0px;">
        <div class="ui-state-default ui-corner-all" style="padding:4px; margin-top:5px; margin-left:8px; margin-right:10px;">
            <span class="ui-icon ui-icon-gear" style="float:left; margin:-2px 5px 0 0;"></span>
            Detalle de configuración de fechas
        </div>
        <div style="height:20px; margin-top:5px; margin-left:10px;">
            <asp:Label ID="lblNomLimEnv" runat="server" style="margin-right:5px;"></asp:Label>
            <asp:TextBox ID="txtLimEnv" runat="server" Width="60px" ReadOnly="true" style="margin-right:15px;"></asp:TextBox>
            <asp:Label ID="lblNomDiaProc" runat="server" style="margin-right:5px;"></asp:Label>
            <asp:TextBox ID="txtDiaProc" runat="server" Width="60px" ReadOnly="true"></asp:TextBox>
        </div>
        <iframe id="ifDetalleCuenta" runat="server" frameborder="0" style="padding:0px; margin:0px;"></iframe>
    </div>

         <!-- ========================================================================================
                LISTA PERIODOS CREADOS - hinope
    ========================================================================================-->
    <div id="dvPeriodosCreados" style="display:none; padding:0px; margin:0px; ">
        <table style="width:100%;height:100%" border="0">
            <tr>
                <td align="center">
                </td>
            </tr>
        </table>
        <center>
        </center>
    </div>
    
    <!-- ==== ASIGNAR VALORES ==== -->
    <div id="dvAsignar" style="display:none; padding:0px; margin:10px; overflow:hidden;">
        <center>
            <div class="dvPanel" style="margin:0px !important; padding:10px !important;">
                <table  align="center" style="width:100%;" border="0">                
                    <!-- CANTIDAD FIJA -->
                    <tr style="height:25px;">
                        <td><input id="ch_1" type="radio" checked="checked" onclick="Evaluar_Asignar(1)"/></td>
                        <td style="width:220px;" align="left"><label id="Label1" style="color:navy" onclick="Evaluar_Asignar(10)">Cantidad fija</label></td>
                        <td>&nbsp;&nbsp;</td>
                        <td><input id="txt_CantidadFija" type="text" style="width:30px;text-align :right " maxlength="4" /></td>
                    </tr>
                    <!-- CONSUMO REAL (Ocultado hasta la próxima mejora)-->
                    <tr style="height:25px;">
                        <td><input id="ch_3" type="radio" onclick="Evaluar_Asignar(3)"/></td>
                        <td align="left">
                            <table cellspacing="0" border="0" cellpadding="0">
                                <tr>
                                    <td><label id="Label3" style="color:navy;" onclick="Evaluar_Asignar(30)">Promedio Sugerido</label></td>
                                    <td>&nbsp;</td>
                                    <td><ttgInfo:ToolTipGenerico ID="ttgInfoArea" runat="server" /></td>
                                    <td>&nbsp;</td>
                                    <td><label id="lblPeriodosSeleccionados" style="font-style:italic; font-size:smaller;"></label></td>
                                </tr>
                            </table>
                        </td>
                        <td></td>
                        <td>
                            <div id="btnPeriodosImportados" class="btnNormal" runat="server" style=" height:20px;" title="Ver periodos de consumo real" >...</div>
                        </td>
                    </tr>
                    <!-- PROMEDIO PONDERADO -->
                    <tr style="height:25px;">
                        <td><input id="ch_6" type="radio" onclick="Evaluar_Asignar(6)" /></td>
                        <td align="left"><label id="lblEvaluarAsignar" style="color:navy" onclick="Evaluar_Asignar(60)" >Distribución según : Minutos Bolsa / N° líneas</label></td>
                        <td></td>
                        <td><input title="Minutos" id="txtCalculo" type="text" style="width:30px;text-align :right " maxlength="4" value="0"/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <input id="chkTipCalcProm" type="checkbox" onclick="CalcPromedio()" disabled="disabled"/>
                            <label id="Label7" style="color:navy" for="chkTipCalcProm">Omitir líneas sin empleado asociado</label>
                        </td>
                    </tr>
                    <!-- MINUTOS ASIGNADOS -->
                    <tr style="height:25px;">
                        <td><input id="ch_4" type="radio" onclick="Evaluar_Asignar(4)"/></td>
                        <td align="left"><label id="Label4" style="color:navy;"  onclick="Evaluar_Asignar(40)">Distribución Vigente  </label></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <!-- APLICAR AUMENTO -->
                    <tr>
                        <td colspan="4">
                            <div class="ui-widget-content ui-helper-clearfix" style="margin: 0.6em .0em;height:0.01em;"></div>
                        </td>
                    </tr>
                    <tr>
                        <td><input id="ch_5" type ="checkbox" onclick="Evaluar_Asignar(5)"/></td>
                        <td>
                            <table cellpadding="0" border="0" cellspacing="0"><tr><td>
                                <label id="Label5" style="color:navy" onclick="Evaluar_Asignar(5)">Aplicar aumento </label>
                            </td><td>&nbsp;</td><td>
                                <ttgInfo:ToolTipGenerico ID="infoAsigValor" runat="server" Mensaje="Si no se ha seleccionado una opción anterior el aumento se hará sobre la Disitribución Actual"/>
                            </td></tr></table>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr id="filaSigno">
                        <td></td>
                        <td align="right">Sumar / Restar</td>
                        <td></td>
                        <td>
                            <select id="dwSigno">
                                <option value="mas" >( + )</option>
                                <option value="menos" >( - )</option>
                            </select>
                        </td>
                    </tr>
                    <tr id="filaCantidad">
                        <td></td>
                        <td align="right">Cantidad minutos</td>
                        <td></td>
                        <td>
                            <input id="txt_AumentarCantidad" type="text" style="width:30px;text-align :right " maxlength="4"/>
                        </td>
                    </tr>
                    <tr id="filaPorcentual" >
                        <td></td>
                        <td align="right">Es porcentual </td>
                        <td></td>
                        <td>
                            <input id="ch_AumentoPorcentual" type="checkbox" title="Valor mayor a 0% hasta 100% "/>
                            
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                </table>
            </div>
           
<!-- ========================================================================================
            OTROS  OTROS  OTROS  OTROS
    ========================================================================================-->
</center>

            <table style="width: 800px;display :none;"  border="0" align="center">
                <tr>
                    <td  align ="center" style="font-size:16px;" >
                        Configuraci&oacuten de Distribución de minutos
                        &nbsp;
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        <div id="btnGuardar_" class="btnNormal">
                            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Aplicar Cambios</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="right" height="10px"></td>
                </tr>
                <tr>
                    <td  align="center" >            
                        <div class="dvPanel" style="float: left; margin-left:10px; width:100%;" id="panelBusqueda">
                            <asp:Label ID="lblTipoDistribucion" runat="server" Text="Tipos de distribución:"></asp:Label>
                            <asp:RadioButtonList ID="rblstTipoDistribucion" runat="server" RepeatDirection="Horizontal">
                                <asp:ListItem Value="1">Por Línea</asp:ListItem>
                                <asp:ListItem Value="2">Por Centro de Costo</asp:ListItem>
                                <asp:ListItem Value="3">Por Área</asp:ListItem>
                                <asp:ListItem Value="4">Por Nivel</asp:ListItem>
                                <asp:ListItem Value="5">Por Grupo de Empleados</asp:ListItem>
                            </asp:RadioButtonList>
                            <br />
                            <div id="dvClaseDistribucion" runat="server" style="display:none;">
                                <asp:RadioButtonList ID="rblstClaseDistribucion" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Value="P">En porcentaje</asp:ListItem>
                                    <asp:ListItem Value="C">En cantidades</asp:ListItem>
                                </asp:RadioButtonList>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>

        </div>


    <!-- ========================================================================================
        Cambiar tipo de distribución de la distribución
    ========================================================================================-->
    <div id="dvEditTipoDistribucion" style="display:none; padding:0px; margin:0px;">
        <table style="margin:10px;">
            <tr style="height:30px;">
                <td style="width: 170px;">
                    Tipo de Distribución Actual
                </td>
                <td>
                    <asp:TextBox ID="txtNombreTipDisAct" runat="server" Enabled="false" Width="120"></asp:TextBox>
                </td>
            </tr>
            <tr style="height:30px;">
                <td colspan="2">
                    Seleccione un nuevo tipo de distribución.
                </td>
            </tr>
            <tr style="height:30px;">
                <td>
                    Tipo de Distribución
                </td>
                <td>
                    <asp:DropDownList ID="ddlEditTipoDist" runat="server" Width="130"></asp:DropDownList>
                </td>
            </tr>
        </table>
    </div>

    <!-- ========================================================================================
        Cambiar datos de configuración al estar vacio.
    ========================================================================================-->
    <div id="dvAsignaConfigBolsa" style="display:none; padding.0px;">
        <iframe id="ifAsignaConfigBolsa" width="680px" height="430px" frameborder="0" style="padding:0px;margin:0px;"></iframe>
        <asp:HiddenField runat="server" ID="hdfEsPrincipal" />
    </div>
    </div>
    </form>

</body>
</html>