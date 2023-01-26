<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Imp_Mnt_PlantillaDetalle" Codebehind="Imp_Mnt_PlantillaDetalle.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>
<%@ Register Src="../../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link  href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Entidades/ENT_MOV_IMP_PlantillaServicioExcluido.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Entidades/ENT_MOV_IMP_PlantillaMultiple.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Entidades/ENT_MOV_IMP_PlantillaCabecera.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Entidades/ENT_MOV_IMP_PlantillaDetalle.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Entidades/ENT_GEN_Servicio.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Entidades/ENT_MOV_IMP_TipoServicioImportacion.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Entidades/ENT_MOV_IMP_Campo.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Entidades/ENT_GEN_Zona.js" type="text/javascript"></script>
    <script src="Imp_Mnt_PlantillaDetalle.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        
        <asp:HiddenField ID="hdfPlanDetalle" runat="server" />
        <asp:HiddenField ID="hdfIsPlantillaMultiple" runat="server" Value="0" />
        
        <div id="divMsgConfirmacion" style="display: none;">
            <span class="ui-icon ui-icon-alert" style="float: left;"></span>¡Se quitará este campo de la plantilla actual!, ¿Desea continuar?
        </div>
        <div id="divMsgConfirmacionCambioTipoPlan" style="display: none;">          
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            <label id="lblMsgTipoPlantilla" style="display:none;">
                Al cambiar el <b>"Tipo Plantilla"</b> se procederá a liberar los campos agregados a la plantilla.
            </label>            
            <br /><br />
            ¿Desea continuar?
        </div>

        <div id="dvCampo" style="padding-bottom: 0px;">
            <table cellpadding="0" cellspacing="0" style="width:100%;" border="0">
                <tr>
                    <td >

                            <table style="width:510px" border="0">
                                <tr>
                                    <td>Tipo de plantilla</td>
                                    <td>
                                        <asp:RadioButtonList id="rdTipPla" runat="server" RepeatDirection="Horizontal" Width="170">
                                            <asp:ListItem Text="Detalle" Value="1" Selected="True"  ></asp:ListItem>
                                            <asp:ListItem Text="Resumen" Value="2" ></asp:ListItem>
                                        </asp:RadioButtonList>
                                        <asp:HiddenField ID="hdfTipoPlantilla" runat="server" />
                                    </td>
                                    <td align="right">
                                            
                                            <div id="btnOpcion" class="btnNormal" runat="server" title="Opciones Hoja de Archivo">
                                                <asp:Image ID="imgOpcion" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Todo.png" />
                                                <a></a>
                                            </div>
                                            <div id="btnOpcionResumen" class="btnNormal" style="display: none;" runat="server" title="Opciones Hoja de Archivo Resumen">
                                                <asp:Image ID="imgOpcionResumen" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Todo.png" />
                                                <a></a>
                                            </div>
                                            <div id="btnAgregar" class="btnNormal" runat="server" title="Agregar Campo">
                                                <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                                <a></a>
                                            </div>
                                            <div id="btnModificar" class="btnNormal" runat="server" title="Modificar posición del campo">
                                                <asp:Image ID="imgModificar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                                <a></a>
                                            </div>
                                            <div id="btnQuitar" class="btnNormal" runat="server" title="Eliminar campo">
                                                <asp:Image ID="imgQuitar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/remove.png" />
                                                <a></a>
                                            </div>
                                    
                                    </td>
                                </tr>
                            </table>
                        
                    </td>
                    <td valign="top" align="right" style="display: none;">
                                        <div id="btnEliminarHoja" class="btnNormal" title="Eliminar Hoja">
                                            <asp:Image ID="imgEliminarHoja" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png"/>
                                            <a></a>
                                        </div>
                    </td>
                </tr>
                <tr><td><br /></td></tr>
                <tr>
                    <td>
                        <table id="tbCampoPlantilla"></table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="dvPanel" style="padding-bottom:0px;width:490px">
                            <asp:Label ID="lblPlanDec" runat="server" Text=""></asp:Label>
                            <br />
                            <asp:Label ID="lblPlanUn" runat="server" Text=""></asp:Label>
                            <br />
                            <asp:Label ID="lblPlan" runat="server" Text=""></asp:Label>
                            <br />
                            <asp:Label ID="lblPlanLit" runat="server" Text=""></asp:Label>
                        </div>                    
                    </td>
                </tr>
            </table>
        </div>
        
        <div id="dvOpciones" style="display: none;">

            <cc1:TabJQ runat="server" ID="TabOpciones" CssClass="tabs" Style="margin-top: 1px;">

                <cc1:ContenedorTabJQ Titulo="General" CssClass="tabHijo" Height="350px">

                   <div class="dvPanel" style="margin: 10px;">

                        <table>
                            <tr>
                                <td>Tipo de cambio:</td>
                                <td>
                                    <asp:CheckBox ID="chkTipoCambio" runat="server" Text="" />
                                </td>
                            </tr>
                            <tr>
                                <td>Agregar 0 /00 a DDN/DDI:</td>
                                <td>
                                    <asp:CheckBox ID="chkAgregarCeroDDNDDI" runat="server" Text="" />
                                </td>
                            </tr>
                            <tr>
                                <td>Extensión por defecto:</td>
                                <td>
                                    <asp:TextBox ID="txtExtensionDefecto" runat="server" Width="30px" Text="" MaxLength="5"></asp:TextBox>
                                </td>
                            </tr>
                            <tr style="display:none;">
                                <td>Servicio-Campo:</td>
                                <td>
                                    <asp:CheckBox ID="chkServicioCampo" runat="server" Text=""/>
                                </td>
                            </tr>
                            <tr style="display:none;">
                                <td>Tipo de plantilla:</td>
                                <td>
                                    <asp:DropDownList ID="ddlTipoPlantilla" runat="server"></asp:DropDownList>  
                                </td>
                            </tr>
                            <tr  style="display: none;">
                                <td>Zona:</td>
                                <td>
                                    <asp:DropDownList ID="ddlZona" runat="server"></asp:DropDownList> 
                                </td>
                            </tr>
                            <tr>
                                <td>Unidad de Datos Origen(Archivo)</td>
                                <td>
                                    <asp:DropDownList ID="ddlUnidadDatosOrigen" runat="server">
                                        <asp:ListItem Text="Byte(B)" Value="B"></asp:ListItem>
                                        <asp:ListItem Text="Kilobyte(KB)" Value="KB" Selected="True"></asp:ListItem>
                                        <asp:ListItem Text="Megabyte(MB)" Value="MB"></asp:ListItem>
                                        <asp:ListItem Text="Gigabyte(GB)" Value="GB"></asp:ListItem>
                                        <%--<asp:ListItem Text="Terabyte(TB)" Value="TB"></asp:ListItem>--%>
                                    </asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td>Unidad de Datos Destino(BD)</td>
                                <td>
                                    <asp:DropDownList ID="ddlUnidadDatosDestino" runat="server" Enabled=false>
                                        <asp:ListItem Text="Byte(B)" Value="B" Selected="True"></asp:ListItem>
                                        <asp:ListItem Text="Kilobyte(KB)" Value="KB"></asp:ListItem>
                                        <asp:ListItem Text="Megabyte(MB)" Value="MB"></asp:ListItem>
                                        <asp:ListItem Text="Gigabyte(GB)" Value="GB"></asp:ListItem>
                                        <asp:ListItem Text="Terabyte(TB)" Value="TB"></asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                            </tr>

                            <tr>
                                <td><asp:CheckBox ID="chkServicioDefecto" runat="server" Text="Servicio por defecto" Checked="false"/></td>
                                <td>
                                    <asp:DropDownList ID="ddlServicioDefecto" runat="server" Width="150px"></asp:DropDownList>
                                </td>
                            </tr>

                            <tr>
                                <td><asp:CheckBox ID="chkServicioPreDefinido" runat="server" Text="Servicio Pre Definido" Checked="false"/></td>
                                <td>
                                    <asp:DropDownList ID="ddlServicioPreDefinido" runat="server" Width="150px"></asp:DropDownList>
                                </td>
                            </tr>
                            <tr>
                                <td><asp:RadioButton ID="rbtCostoIncluido" runat="server" Text="Costo sin prorrateo" GroupName="ConstoIncluido" Checked="true"/></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><asp:RadioButton ID="rbtActualizaCosto" runat="server" Text="Costo con prorrateo" GroupName="ConstoIncluido" Checked="false"/></td>
                                <td>
                                    <%--<asp:RadioButtonList ID="chklstTipoCosteo" runat="server" RepeatDirection="Vertical">
                                        <asp:ListItem Value="1" Text="Cantidad asignada según Planes/Bolsas" />
                                        <asp:ListItem Value="0" Text="Cantidad consumida según importación de llamadas" />
                                    </asp:RadioButtonList>--%>
                                    <asp:DropDownList ID="ddlTipoCosteo" runat="server">
                                        <asp:ListItem Value="-1" Text="<Seleccione>" Selected="True"></asp:ListItem>
                                        <asp:ListItem Value="1" Text="Cantidad asignada según Planes/Bolsas"></asp:ListItem>
                                        <asp:ListItem Value="0" Text="Cantidad consumida según importación"></asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                            </tr>
                        </table>
                    </div> 
                </cc1:ContenedorTabJQ>
                <cc1:ContenedorTabJQ Titulo="Extras" CssClass="tabHijo" Height="310px">
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td>
                                <div class="dvPanel" style="margin: 10px;">
                                    <span style=" font-weight:bold">Números</span>
                                    <table>
                                        <tr>
                                            <td>Cantidad de decimales</td>
                                            <td>
                                                <asp:TextBox ID="txtCantidadDecimal" runat="server" Width="30px" Text="0" MaxLength="1"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Símbolo decimal</td>
                                            <td>
                                                <asp:DropDownList ID="ddlSimboloDecimal" runat="server">
                                                    <asp:ListItem Text="Punto" Value="."></asp:ListItem>
                                                    <asp:ListItem Text="Coma" Value=","></asp:ListItem>
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                            <td>
                                <div class="dvPanel" style="margin: 10px; width:80px;">
                                    <span style=" font-weight:bold">Impuestos</span>
                                    <table>
                                        <tr>
                                            <td>Signo</td>
                                            <td>
                                                <asp:DropDownList ID="ddlSigno" runat="server">
                                                    <asp:ListItem Text="+" Value="+"></asp:ListItem>
                                                    <asp:ListItem Text="-" Value="-"></asp:ListItem>
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Tasa</td>
                                            <td>
                                                <asp:TextBox ID="txtTasa" runat="server" Width="30px" Text="0" MaxLength="6"></asp:TextBox>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="dvPanel" style="margin: 10px;">
                        <span style=" font-weight:bold">Fecha y hora</span>
                        <table>
                            <tr>
                                <td>
                                    Separador fecha:
                                </td>
                                <td>
                                    <asp:TextBox ID="txtSeparadorFecha" runat="server" Width="15px" Text="/" MaxLength="1"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Formato fecha:
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlFormatoFechaDia" runat="server">
                                        <asp:ListItem Text="dd" Value="dd" Selected="True"></asp:ListItem>
                                        <asp:ListItem Text="mm" Value="mm"></asp:ListItem>
                                        <asp:ListItem Text="yy" Value="yy"></asp:ListItem>
                                        <asp:ListItem Text="yyyy" Value="yyyy"></asp:ListItem>
                                    </asp:DropDownList>
                                    <asp:DropDownList ID="ddlFormatoFechaMes" runat="server">
                                        <asp:ListItem Text="dd" Value="dd"></asp:ListItem>
                                        <asp:ListItem Text="mm" Value="mm" Selected="True"></asp:ListItem>
                                        <asp:ListItem Text="yy" Value="yy"></asp:ListItem>
                                        <asp:ListItem Text="yyyy" Value="yyyy"></asp:ListItem>
                                    </asp:DropDownList>
                                    <asp:DropDownList ID="ddlFormatoFechaAnho" runat="server">
                                        <asp:ListItem Text="dd" Value="dd"></asp:ListItem>
                                        <asp:ListItem Text="mm" Value="mm"></asp:ListItem>
                                        <asp:ListItem Text="yy" Value="yy"></asp:ListItem>
                                        <asp:ListItem Text="yyyy" Value="yyyy" Selected="True"></asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    Formato fecha:
                                </td>
                                <td>
                                    <asp:TextBox ID="txtFechaFormato" runat="server" Width="163px" Text="" ReadOnly="true"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Separador hora:
                                </td>
                                <td>
                                    <asp:TextBox ID="txtSeparadorHora" runat="server" Width="15px" Text=":" MaxLength="1"></asp:TextBox>
                                </td>
                            </tr>                            
                        </table>
                    </div>
                    <div class="dvPanel" style="margin: 10px;">
                        <asp:Label ID="lblSignFecha" runat="server" Text="dd= Día, MM= Mes, yyyy= Año"></asp:Label><br />
                        <asp:Label ID="lblSignHora" runat="server" Text="hh= Hora, mm=Minutos, ss= Segundos"></asp:Label>
                    </div>
                </cc1:ContenedorTabJQ>
                <cc1:ContenedorTabJQ Titulo="Separador" CssClass="tabHijo" Height="350px">
                    <div class="dvPanel" style="margin: 10px;">
                        <asp:RadioButtonList ID="rbSeparador" runat="server">
                            <asp:ListItem Selected="True" Value="0">Tabulación</asp:ListItem>
                            <asp:ListItem Selected="False" Value="1">Punto y coma</asp:ListItem>
                            <asp:ListItem Selected="False" Value="2">Coma</asp:ListItem>
                            <asp:ListItem Selected="False" Value="3">Otro</asp:ListItem>
                        </asp:RadioButtonList>
                        <asp:TextBox ID="txtOtroSeparador" runat="server" MaxLength="1" Width="50px"></asp:TextBox>
                    </div>
                </cc1:ContenedorTabJQ>
                <cc1:ContenedorTabJQ Titulo="Identificadores" CssClass="tabHijo" Height="310px">
                    <div class="dvPanel" style="margin: 5px;">
                        <table style="margin-top:-2px; margin-bottom: -2px;">
                            <tr>
                                <td colspan="5" style="font-weight:bold;">Cabeceras</td>
                            </tr>
                            <tr>
                                <td>Número</td>
                                <td><asp:TextBox ID="txtCabecera" runat="server" MaxLength="20"></asp:TextBox></td>
                                <td rowspan="3">
                                    <div class="ui-widget-content ui-helper-clearfix" style="margin: .0em 0.4em;height:7em;width:0.01em"></div>
                                </td>
                                <td>Fecha</td>
                                <td><asp:TextBox ID="txtCabeceraFecha" runat="server" MaxLength="50"></asp:TextBox></td>
                            </tr>
                            <tr>
                                <td>Contiene # Cel</td>
                                <td><asp:CheckBox ID="chkContieneNumCelular" runat="server" Text="" /></td>
                                <td>Contiene fecha</td>
                                <td><asp:CheckBox ID="chkContieneFecha" runat="server" Text="" /></td>
                            </tr>
                            <tr>
                                <td>Ubicación</td>
                                <td><asp:DropDownList ID="ddlUbicacionNumCelular" runat="server">
                                        <asp:ListItem Text="<Seleccione>" Value="-1"></asp:ListItem>
                                        <asp:ListItem Text="Arriba" Value="1"></asp:ListItem>
                                        <asp:ListItem Text="Abajo" Value="2"></asp:ListItem>
                                        <asp:ListItem Text="Derecha" Value="3"></asp:ListItem>
                                        <asp:ListItem Text="Izquierda" Value="4"></asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                                <td>Ubicación</td>
                                <td><asp:DropDownList ID="ddlUbicacionFecha" runat="server">
                                        <asp:ListItem Text="<Seleccione>" Value="-1"></asp:ListItem>
                                        <asp:ListItem Text="Arriba" Value="1"></asp:ListItem>
                                        <asp:ListItem Text="Abajo" Value="2"></asp:ListItem>
                                        <asp:ListItem Text="Derecha" Value="3"></asp:ListItem>
                                        <asp:ListItem Text="Izquierda" Value="4"></asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="dvPanel" style="margin: 5px;">
                        <table style="margin-top:-2px; margin-bottom: -2px;">
                            <tr><td colspan="2" style="font-weight:bold;">Exclusiones</td></tr>
                            <tr>
                                <td style="width:73px;">Servicios</td>
                                <td>
                                    <asp:DropDownList ID="ddlServiciosExcluir" runat="server" Width="290px"></asp:DropDownList>
                                    <asp:Image ID="imgAgregarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"
                                        CssClass="imgBtn" ToolTip="Agregar servicio" />
                                    <asp:Image ID="imgQuitarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif"
                                        CssClass="imgBtn" ToolTip="Quitar servicio" />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="">
                                    <asp:ListBox ID="lstServiciosExcluidos" runat="server" Height="100px" Width="290px" SelectionMode="Multiple">
                                    </asp:ListBox>
                                </td>            
                            </tr>
                        </table>
                    </div>
                </cc1:ContenedorTabJQ>
                <cc1:ContenedorTabJQ Titulo="Filtros" CssClass="tabHijo" Height="310px">
                    <div class="dvPanel" style="margin: 5px;">
                        <table style="margin-top:-2px; margin-bottom: -2px;">
                            <tr>
                                <td colspan="4" style="padding-bottom:8px;">Si no se ingresa ningún filtro, se asumirán todas las llamadas como salientes.</td>
                            </tr>
                            <tr>
                                <td style="width: 50px">Filtro 1</td>
                                <td style="width: 140px"><asp:TextBox ID="txtFiltro1" runat="server" Width="140px" MaxLength="40"></asp:TextBox></td>
                                <td style="width: 120px"><asp:CheckBox ID="chkInsEntrFil1" runat="server" Text="Enviar a salientes" Enabled="false"/></td>
                                <td align="left"><ttgInfo:ToolTipGenerico ID="ttgInfoFiltro1" runat="server" Mensaje="Cargará llamada entrantes (con costo mayor a 0) como salientes" /></td>
                            </tr>
                            <tr id="trFiltro1_2" style="display: none">
                                <td>Servicio</td>
                                <td><asp:DropDownList ID="ddlServicioFiltro1" runat="server" Width="150px"></asp:DropDownList></td>
                                <td colspan="2" style="font-style:italic; padding-left:5px;">(Servicio predefinido para entrantes)</td>
                            </tr>
                            <tr id="trFiltro2_0" style="display:none;">
                                <td colspan="4" align="center">
                                    <div id="linFiltro2" class="ui-widget-content ui-helper-clearfix" style="margin: 0.5em .5em;height:0.01em;width:36.4em"></div>
                                </td>
                            </tr>
                            <tr id="trFiltro2" style="display: none">
                                <td>Filtro 2</td>
                                <td style="border-top-width:2px;" ><asp:TextBox ID="txtFiltro2" runat="server" Width="140px" MaxLength="40"></asp:TextBox></td>
                                <td><asp:CheckBox ID="chkInsEntrFil2" runat="server" Text="Enviar a salientes" Enabled="false"/></td>
                                <td><ttgInfo:ToolTipGenerico ID="ttgInfoFiltro2" runat="server" Mensaje="Cargará llamada entrantes (con costo mayor a 0) como salientes" /></td>
                            </tr>
                            <tr id="trFiltro2_2" style="display: none">
                                <td>Servicio</td>
                                <td><asp:DropDownList ID="ddlServicioFiltro2" runat="server" Width="150px"></asp:DropDownList></td>
                                <td colspan="2" style="font-style:italic; padding-left:5px;">(Servicio predefinido para entrantes)</td>
                            </tr>
                            <tr id="trFiltro3_0" style="display:none;">
                                <td colspan="4" align="center">
                                    <div id="linFiltro3" class="ui-widget-content ui-helper-clearfix" style="margin: 0.5em .5em;height:0.01em;width:36.4em"></div>
                                </td>
                            </tr>
                            <tr id="trFiltro3" style="display: none">
                                <td>Filtro 3</td>
                                <td><asp:TextBox ID="txtFiltro3" runat="server" Width="140px" MaxLength="40"></asp:TextBox></td>
                                <td><asp:CheckBox ID="chkInsEntrFil3" runat="server" Text="Enviar a salientes" Enabled="false"/></td>
                                <td><ttgInfo:ToolTipGenerico ID="ttgInfoFiltro3" runat="server" Mensaje="Cargará llamada entrantes (con costo mayor a 0) como salientes" /></td>
                            </tr>
                            <tr id="trFiltro3_2" style="display: none">
                                <td>Servicio</td>
                                <td><asp:DropDownList ID="ddlServicioFiltro3" runat="server" Width="150px"></asp:DropDownList></td>
                                <td colspan="2" style="font-style:italic; padding-left:5px;">(Servicio predefinido para entrantes)</td>
                            </tr>
                            <tr id="trFiltro4_0" style="display:none;">
                                <td colspan="4" align="center">
                                    <div id="linFiltro4" class="ui-widget-content ui-helper-clearfix" style="margin: 0.5em .5em;height:0.01em;width:36.4em"></div>
                                </td>
                            </tr>
                            <tr id="trFiltro4" style="display: none">
                                <td>Filtro 4</td>
                                <td style="border-top-width:2px;" ><asp:TextBox ID="txtFiltro4" runat="server" Width="140px" MaxLength="40"></asp:TextBox></td>
                                <td><asp:CheckBox ID="chkInsEntrFil4" runat="server" Text="Enviar a salientes" Enabled="false"/></td>
                                <td><ttgInfo:ToolTipGenerico ID="ttgInfoFiltro4" runat="server" Mensaje="Cargará llamada entrantes (con costo mayor a 0) como salientes" /></td>
                            </tr>
                            <tr id="trFiltro4_2" style="display: none">
                                <td>Servicio</td>
                                <td><asp:DropDownList ID="ddlServicioFiltro4" runat="server" Width="150px"></asp:DropDownList></td>
                                <td colspan="2" style="font-style:italic; padding-left:5px;">(Servicio predefinido para entrantes)</td>
                            </tr>
                            <tr id="trFiltro5_0" style="display:none;">
                                <td colspan="4" align="center">
                                    <div id="linFiltro5" class="ui-widget-content ui-helper-clearfix" style="margin: 0.5em .5em;height:0.01em;width:36.4em"></div>
                                </td>
                            </tr>
                            <tr id="trFiltro5" style="display: none">
                                <td>Filtro 5</td>
                                <td style="border-top-width:2px;" ><asp:TextBox ID="txtFiltro5" runat="server" Width="140px" MaxLength="40"></asp:TextBox></td>
                                <td><asp:CheckBox ID="chkInsEntrFil5" runat="server" Text="Enviar a salientes" Enabled="false"/></td>
                                <td><ttgInfo:ToolTipGenerico ID="ttgInfoFiltro5" runat="server" Mensaje="Cargará llamada entrantes (con costo mayor a 0) como salientes" /></td>
                            </tr>
                            <tr id="trFiltro5_2" style="display: none">
                                <td>Servicio</td>
                                <td><asp:DropDownList ID="ddlServicioFiltro5" runat="server" Width="150px"></asp:DropDownList></td>
                                <td colspan="2" style="font-style:italic; padding-left:5px;">(Servicio predefinido para entrantes)</td>
                            </tr>
                            <tr id="trFiltro6_0" style="display:none;">
                                <td colspan="4" align="center">
                                    <div id="linFiltro6" class="ui-widget-content ui-helper-clearfix" style="margin: 0.5em .5em;height:0.01em;width:36.4em"></div>
                                </td>
                            </tr>
                            <tr id="trFiltro6" style="display: none">
                                <td>Filtro 6</td>
                                <td style="border-top-width:2px;" ><asp:TextBox ID="txtFiltro6" runat="server" Width="140px" MaxLength="40"></asp:TextBox></td>
                                <td><asp:CheckBox ID="chkInsEntrFil6" runat="server" Text="Enviar a salientes" Enabled="false"/></td>
                                <td><ttgInfo:ToolTipGenerico ID="ttgInfoFiltro6" runat="server" Mensaje="Cargará llamada entrantes (con costo mayor a 0) como salientes" /></td>
                            </tr>
                            <tr id="trFiltro6_2" style="display: none">
                                <td>Servicio</td>
                                <td><asp:DropDownList ID="ddlServicioFiltro6" runat="server" Width="150px"></asp:DropDownList></td>
                                <td colspan="2" style="font-style:italic; padding-left:5px;">(Servicio predefinido para entrantes)</td>
                            </tr>
                        </table>
                    </div>
                </cc1:ContenedorTabJQ>
            </cc1:TabJQ>
        </div>
        
        <div id="dvOpcionesResumen" style="display: none;">
            <cc1:TabJQ runat="server" ID="TabOpcionesResumen" CssClass="tabs" Style="margin-top: 1px;">
            
                <cc1:ContenedorTabJQ Titulo="Extras" CssClass="tabHijo" Height="350px">
                    <table cellpadding="0" cellspacing="0">
                        <tr style="display: none">
                            <td>
                                <div class="dvPanel" style="margin: 10px;">
                                    <span style=" font-weight:bold">Números</span>
                                    <table>
                                        <tr>
                                            <td>Cantidad de decimales</td>
                                            <td>
                                                <asp:TextBox ID="txtCantidadDecimalRes" runat="server" Width="30px" Text="0" MaxLength="1"></asp:TextBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Símbolo decimal</td>
                                            <td>
                                                <asp:DropDownList ID="ddlSimboloDecimalRes" runat="server">
                                                    <asp:ListItem Text="Punto" Value="."></asp:ListItem>
                                                    <asp:ListItem Text="Coma" Value=","></asp:ListItem>
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="dvPanel" style="margin: 10px; ">
                                    <span style=" font-weight:bold">Plantilla</span>
                                    <table>
                                        <tr>
                                            <td style="width: 100px;">
                                                Facturación de:
                                            </td>
                                            <td>
                                                <asp:RadioButtonList id="rbListPla" runat="server" RepeatDirection="Horizontal" Width="170">
                                                    <asp:ListItem Text="Equipos" Value="1"></asp:ListItem>
                                                    <asp:ListItem Text="Líneas" Value="2" Selected="True"></asp:ListItem>
                                                </asp:RadioButtonList>
                                                <asp:HiddenField ID="hdfTipPla" runat="server" /> 
                                            </td>
                                        </tr>
                                        <tr>
                                        <td style="width: 100px;">
                                                Conceptos en:
                                            </td>
                                            <td>
                                                <asp:DropDownList ID="ddlConceptosEn" runat="server" Width="100px">
                                                     <asp:ListItem Text="Columnas" Value="columna"></asp:ListItem>
                                                    <asp:ListItem Text="Filas" Value="fila"></asp:ListItem>                                                   
                                                </asp:DropDownList> 
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="dvPanel" style="margin: 10px; ">
                                    <span style=" font-weight:bold">Impuestos</span>
                                    <table>
                                        <tr>
                                            <td colspan="2" style="padding-bottom:8px;">
                                                Sí ingresa un valor mayor a cero "0" en la TASA de impuestos, entonces no será necesario agregar el "Impuesto" en los campos de la plantilla.<br/>
                                                De lo contrario, se asumirá que el valor del impuesto se aplicará a los conceptos configurados en la plantilla.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Impuesto</td>
                                            <td>
                                                <asp:DropDownList ID="ddlModoImpuesto" runat="server" Width="310px">
                                                    <asp:ListItem Text="<Ninguno>" Value=""></asp:ListItem>
                                                     <asp:ListItem Text="Calcular automáticamente el impuesto" Value="1"></asp:ListItem>
                                                    <asp:ListItem Text="El impuesto está incluido en el monto" Value="2"></asp:ListItem>                                                   
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr class="filaImpuesto" style="display: none;">
                                            <td>Signo</td>
                                            <td>
                                                <asp:DropDownList ID="ddlSignoRes" runat="server" Width="50px">
                                                    <asp:ListItem Text="+" Value="+"></asp:ListItem>
                                                    <asp:ListItem Text="-" Value="-"></asp:ListItem>
                                                </asp:DropDownList>
                                            </td>
                                        </tr>
                                        <tr class="filaImpuesto" style="display: none;">
                                            <td>Tasa</td>
                                            <td>
                                                <asp:TextBox ID="txtTasaRes" runat="server" Width="40px" Text="0" MaxLength="6"></asp:TextBox> (*) Ejm.: Si la tasa = 18%, ingresar en el campo "0.18"
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>

                    <div class="dvPanel" style="margin: 10px; display: none">
                        <span style=" font-weight:bold">Fecha y hora</span>
                        <table>
                            <tr>
                                <td>
                                    Separador fecha:
                                </td>
                                <td>
                                    <asp:TextBox ID="txtSeparadorFechaRes" runat="server" Width="15px" Text="/" MaxLength="1"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Formato fecha:
                                </td>
                                <td>
                                    <asp:DropDownList ID="ddlFormatoFechaDiaRes" runat="server">
                                        <asp:ListItem Text="dd" Value="dd" Selected="True"></asp:ListItem>
                                        <asp:ListItem Text="mm" Value="mm"></asp:ListItem>
                                        <asp:ListItem Text="yy" Value="yy"></asp:ListItem>
                                        <asp:ListItem Text="yyyy" Value="yyyy"></asp:ListItem>
                                    </asp:DropDownList>
                                    <asp:DropDownList ID="ddlFormatoFechaMesRes" runat="server">
                                        <asp:ListItem Text="dd" Value="dd"></asp:ListItem>
                                        <asp:ListItem Text="mm" Value="mm" Selected="True"></asp:ListItem>
                                        <asp:ListItem Text="yy" Value="yy"></asp:ListItem>
                                        <asp:ListItem Text="yyyy" Value="yyyy"></asp:ListItem>
                                    </asp:DropDownList>
                                    <asp:DropDownList ID="ddlFormatoFechaAnhoRes" runat="server">
                                        <asp:ListItem Text="dd" Value="dd"></asp:ListItem>
                                        <asp:ListItem Text="mm" Value="mm"></asp:ListItem>
                                        <asp:ListItem Text="yy" Value="yy"></asp:ListItem>
                                        <asp:ListItem Text="yyyy" Value="yyyy" Selected="True"></asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    Formato fecha:
                                </td>
                                <td>
                                    <asp:TextBox ID="txtFechaFormatoRes" runat="server" Width="163px" Text=""></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Separador hora:
                                </td>
                                <td>
                                    <asp:TextBox ID="txtSeparadorHoraRes" runat="server" Width="15px" Text=":" MaxLength="1"></asp:TextBox>
                                </td>
                            </tr>                            
                        </table>
                    </div>

                  <%--  <div class="dvPanel" style="margin: 10px; display: none">
                        <asp:Label ID="Label1" runat="server" Text="dd= Día, MM= Mes, yyyy= Año"></asp:Label><br />
                        <asp:Label ID="Label2" runat="server" Text="hh= Hora, mm=Minutos, ss= Segundos"></asp:Label>
                    </div>--%>

                </cc1:ContenedorTabJQ>
                <cc1:ContenedorTabJQ Titulo="Plantilla Múltiple" CssClass="tabHijo" Height="310px">
                    <div class="dvPanel" style="margin: 5px;">
                        <table style="margin-top:-2px; margin-bottom: -2px;">
                            <tr>
                                <td colspan="4" style="padding-bottom:8px;">Si no se ingresa ninguna configuracion, se asumirán que la plantilla es única.</td>
                            </tr>
                            <tr>
                                <td style="width: 50px">Filtro</td>
                                <td style="width: 330px"><asp:TextBox ID="TxtFiltroMultiple_1" runat="server" Width="320px" MaxLength="200"></asp:TextBox></td>                                
                                <td align="left"><ttgInfo:ToolTipGenerico ID="ttgInfoFiltroMultiple_1" runat="server" Mensaje="" /></td>
                            </tr>
                            <tr id="trFiltroMultiple1_2" style="display: none">
                                <td>Plantilla</td>
                                <td colspan="3"><asp:DropDownList ID="ddlFiltroMultiple_1" runat="server" Width="320px"></asp:DropDownList></td>
                            </tr>
                            <tr id="trFiltroMultiple1_3" style="display: none">
                                <td></td>
                                <td colspan="3" style="font-style:italic; padding-left:5px;">(Plantilla que debe procesar si encuentra el filtro ingresado)</td>
                            </tr>
                            <tr id="trFiltroMultiple2_0" style="display:none;">
                                <td colspan="4" align="center">
                                    <div id="linFiltroMultiple" class="ui-widget-content ui-helper-clearfix" style="margin: 0.5em .5em;height:0.01em;width:36.4em"></div>
                                </td>
                            </tr>

                            <tr id="trFiltroMultiple2" style="display: none">
                                <td style="width: 50px">Filtro</td>
                                <td style="width: 330px"><asp:TextBox ID="TxtFiltroMultiple_2" runat="server" Width="320px" MaxLength="200"></asp:TextBox></td>                                
                                <td align="left"><ttgInfo:ToolTipGenerico ID="ttgInfoFiltroMultiple_2" runat="server" Mensaje="" /></td>
                            </tr>
                            <tr id="trFiltroMultiple2_2" style="display: none">
                                <td>Plantilla</td>
                                <td colspan="3"><asp:DropDownList ID="ddlFiltroMultiple_2" runat="server" Width="320px"></asp:DropDownList></td>
                            </tr>
                            <tr id="trFiltroMultiple2_3" style="display: none">
                                <td></td>
                                <td colspan="3" style="font-style:italic; padding-left:5px;">(Plantilla que debe procesar si encuentra el filtro ingresado)</td>
                            </tr>
                            <tr id="trFiltroMultiple3_0" style="display:none;">
                                <td colspan="4" align="center">
                                    <div id="linFiltroMultiple3" class="ui-widget-content ui-helper-clearfix" style="margin: 0.5em .5em;height:0.01em;width:36.4em"></div>
                                </td>
                            </tr>

                            <tr id="trFiltroMultiple3" style="display: none">
                                <td style="width: 50px">Filtro</td>
                                <td style="width: 330px"><asp:TextBox ID="TxtFiltroMultiple_3" runat="server" Width="320px" MaxLength="200"></asp:TextBox></td>                                
                                <td align="left"><ttgInfo:ToolTipGenerico ID="ttgInfoFiltroMultiple_3" runat="server" Mensaje="" /></td>
                            </tr>
                            <tr id="trFiltroMultiple3_2" style="display: none">
                                <td>Plantilla</td>
                                <td colspan="3"><asp:DropDownList ID="ddlFiltroMultiple_3" runat="server" Width="320px"></asp:DropDownList></td>
                            </tr>
                            <tr id="trFiltroMultiple3_3" style="display: none">
                                <td></td>
                                <td colspan="3" style="font-style:italic; padding-left:5px;">(Plantilla que debe procesar si encuentra el filtro ingresado)</td>
                            </tr>
                            <tr id="trFiltroMultiple4_0" style="display:none;">
                                <td colspan="4" align="center">
                                    <div id="linFiltroMultiple4" class="ui-widget-content ui-helper-clearfix" style="margin: 0.5em .5em;height:0.01em;width:36.4em"></div>
                                </td>
                            </tr>

                            <tr id="trFiltroMultiple4" style="display: none">
                                <td style="width: 50px">Filtro</td>
                                <td style="width: 330px"><asp:TextBox ID="TxtFiltroMultiple_4" runat="server" Width="320px" MaxLength="200"></asp:TextBox></td>                                
                                <td align="left"><ttgInfo:ToolTipGenerico ID="ttgInfoFiltroMultiple_4" runat="server" Mensaje="" /></td>
                            </tr>
                            <tr id="trFiltroMultiple4_2" style="display: none">
                                <td>Plantilla</td>
                                <td colspan="3"><asp:DropDownList ID="ddlFiltroMultiple_4" runat="server" Width="320px"></asp:DropDownList></td>
                            </tr>
                            <tr id="trFiltroMultiple4_3" style="display: none">
                                <td></td>
                                <td colspan="3" style="font-style:italic; padding-left:5px;">(Plantilla que debe procesar si encuentra el filtro ingresado)</td>
                            </tr>
                            <tr id="trFiltroMultiple5_0" style="display:none;">
                                <td colspan="4" align="center">
                                    <div id="linFiltroMultiple5" class="ui-widget-content ui-helper-clearfix" style="margin: 0.5em .5em;height:0.01em;width:36.4em"></div>
                                </td>
                            </tr>

                            <tr id="trFiltroMultiple5" style="display: none">
                                <td style="width: 50px">Filtro</td>
                                <td style="width: 330px"><asp:TextBox ID="TxtFiltroMultiple_5" runat="server" Width="320px" MaxLength="200"></asp:TextBox></td>                                
                                <td align="left"><ttgInfo:ToolTipGenerico ID="ttgInfoFiltroMultiple_5" runat="server" Mensaje="" /></td>
                            </tr>
                            <tr id="trFiltroMultiple5_2" style="display: none">
                                <td>Plantilla</td>
                                <td colspan="3"><asp:DropDownList ID="ddlFiltroMultiple_5" runat="server" Width="320px"></asp:DropDownList></td>
                            </tr>
                            <tr id="trFiltroMultiple5_3" style="display: none">
                                <td></td>
                                <td colspan="3" style="font-style:italic; padding-left:5px;">(Plantilla que debe procesar si encuentra el filtro ingresado)</td>
                            </tr>
                            <tr id="trFiltroMultiple6_0" style="display:none;">
                                <td colspan="4" align="center">
                                    <div id="linFiltroMultiple6" class="ui-widget-content ui-helper-clearfix" style="margin: 0.5em .5em;height:0.01em;width:36.4em"></div>
                                </td>
                            </tr>

                            <tr id="trFiltroMultiple6" style="display: none">
                                <td style="width: 50px">Filtro</td>
                                <td style="width: 330px"><asp:TextBox ID="TxtFiltroMultiple_6" runat="server" Width="320px" MaxLength="200"></asp:TextBox></td>                                
                                <td align="left"><ttgInfo:ToolTipGenerico ID="ttgInfoFiltroMultiple_6" runat="server" Mensaje="" /></td>
                            </tr>
                            <tr id="trFiltroMultiple6_2" style="display: none">
                                <td>Plantilla</td>
                                <td colspan="3"><asp:DropDownList ID="ddlFiltroMultiple_6" runat="server" Width="320px"></asp:DropDownList></td>
                            </tr>
                            <tr id="trFiltroMultiple6_3" style="display: none">
                                <td></td>
                                <td colspan="3" style="font-style:italic; padding-left:5px;">(Plantilla que debe procesar si encuentra el filtro ingresado)</td>
                            </tr>



                        </table>
                    </div>
                </cc1:ContenedorTabJQ>
                <cc1:ContenedorTabJQ Titulo="Configurar Cabeceras" CssClass="tabHijo" Height="310px">
                    <div class="dvPanel" style="margin: 5px;">
                        <table style="margin-top:-2px; margin-bottom: -2px;">
<%--                            <tr>
                                <td colspan="4" style="padding-bottom:8px;">Si no se ingresa ninguna configuracion, se asumirán que la plantilla es única.</td>
                            </tr>--%>
                            <tr id="trCabecera1">
                                <td style="width: 50px">Texto Cabecera</td>
                                <td style="width: 330px" colspan="2"><asp:TextBox ID="txtCabTexto_1" runat="server" Width="320px" MaxLength="200"></asp:TextBox></td>                                
                            </tr>
                            <tr id="trLongitud1">
                                <td>Longitud</td>
                                <td>
                                  <table>
                                    <tr>
                                      <td><asp:TextBox ID="TxtCabLongitud_1" runat="server" Width="80px" MaxLength="3" Enabled="false"></asp:TextBox></td>
                                      <td><ttgInfo:ToolTipGenerico ID="ttgInfoCabecera_1" runat="server" Mensaje="" /></td>
                                    </tr>
                                  </table>
                                </td>
                                <td></td>
                            </tr>
                            <tr id="trSeparador2"  style="display:none;">
                                <td colspan="4" align="center">
                                    <div id="Div1" class="ui-widget-content ui-helper-clearfix" style="margin: 0.5em .5em;height:0.01em;width:36.4em"></div>
                                </td>
                            </tr>

                            <tr id="trCabecera2"  style="display:none;">
                                <td style="width: 50px">Texto Cabecera</td>
                                <td style="width: 330px" colspan="2"><asp:TextBox ID="txtCabTexto_2" runat="server" Width="320px" MaxLength="200"></asp:TextBox></td>                                
                            </tr>
                            <tr id="trLongitud2" style="display:none;">
                                <td>Longitud</td>
                                <td>
                                  <table>
                                    <tr>
                                      <td><asp:TextBox ID="TxtCabLongitud_2" runat="server" Width="80px" MaxLength="3" Enabled="false"></asp:TextBox></td>
                                      <td><ttgInfo:ToolTipGenerico ID="ttgInfoCabecera_2" runat="server" Mensaje="" /></td>
                                    </tr>
                                  </table>                                
                                </td>
                                <td></td>
                            </tr>
                            <tr id="trSeparador3" style="display:none;">
                                <td colspan="4" align="center">
                                    <div id="Div2" class="ui-widget-content ui-helper-clearfix" style="margin: 0.5em .5em;height:0.01em;width:36.4em"></div>
                                </td>
                            </tr>

                            <tr id="trCabecera3"  style="display:none;">
                                <td style="width: 50px">Texto Cabecera</td>
                                <td style="width: 330px" colspan="2"><asp:TextBox ID="txtCabTexto_3" runat="server" Width="320px" MaxLength="200"></asp:TextBox></td>                                
                            </tr>
                            <tr id="trLongitud3"  style="display:none;">
                                <td>Longitud</td>
                                <td>
                                  <table>
                                    <tr>
                                      <td><asp:TextBox ID="TxtCabLongitud_3" runat="server" Width="80px" MaxLength="3" Enabled="false"></asp:TextBox></td>
                                      <td><ttgInfo:ToolTipGenerico ID="ttgInfoCabecera_3" runat="server" Mensaje="" /></td>
                                    </tr>
                                  </table>
                                </td>
                                <td></td>
                            </tr>
                            <tr id="trSeparador4" style="display:none;">
                                <td colspan="4" align="center">
                                    <div id="Div3" class="ui-widget-content ui-helper-clearfix" style="margin: 0.5em .5em;height:0.01em;width:36.4em"></div>
                                </td>
                            </tr>

                            <tr id="trCabecera4"  style="display:none;">
                                <td style="width: 50px">Texto Cabecera</td>
                                <td style="width: 330px" colspan="2"><asp:TextBox ID="txtCabTexto_4" runat="server" Width="320px" MaxLength="200"></asp:TextBox></td>                                
                            </tr>
                            <tr id="trLongitud4"  style="display:none;">
                                <td>Longitud</td>
                                <td>
                                  <table>
                                    <tr>
                                      <td><asp:TextBox ID="TxtCabLongitud_4" runat="server" Width="80px" MaxLength="3" Enabled="false"></asp:TextBox></td>
                                      <td><ttgInfo:ToolTipGenerico ID="ttgInfoCabecera_4" runat="server" Mensaje="" /></td>
                                    </tr>
                                  </table>
                                </td>
                                <td></td>
                            </tr>
                            <tr id="trSeparador5" style="display:none;">
                                <td colspan="4" align="center">
                                    <div id="Div4" class="ui-widget-content ui-helper-clearfix" style="margin: 0.5em .5em;height:0.01em;width:36.4em"></div>
                                </td>
                            </tr>

                            <tr id="trCabecera5"  style="display:none;">
                                <td style="width: 50px">Texto Cabecera</td>
                                <td style="width: 330px" colspan="2"><asp:TextBox ID="txtCabTexto_5" runat="server" Width="320px" MaxLength="200"></asp:TextBox></td>                                
                            </tr>
                            <tr id="trLongitud5"  style="display:none;">
                                <td>Longitud</td>
                                <td>
                                  <table>
                                    <tr>
                                      <td><asp:TextBox ID="TxtCabLongitud_5" runat="server" Width="80px" MaxLength="3" Enabled="false"></asp:TextBox></td>
                                      <td><ttgInfo:ToolTipGenerico ID="ttgInfoCabecera_5" runat="server" Mensaje="" /></td>
                                    </tr>
                                  </table>
                                </td>
                                <td></td>
                            </tr>
                            <tr id="trSeparador6" style="display:none;">
                                <td colspan="4" align="center">
                                    <div id="Div5" class="ui-widget-content ui-helper-clearfix" style="margin: 0.5em .5em;height:0.01em;width:36.4em"></div>
                                </td>
                            </tr>

                            <tr id="trCabecera6"  style="display:none;">
                                <td style="width: 50px">Texto Cabecera</td>
                                <td style="width: 330px" colspan="2"><asp:TextBox ID="txtCabTexto_6" runat="server" Width="320px" MaxLength="200"></asp:TextBox></td>                                
                            </tr>
                            <tr id="trLongitud6"  style="display:none;">
                                <td>Longitud</td>
                                <td>
                                  <table>
                                    <tr>
                                      <td><asp:TextBox ID="TxtCabLongitud_6" runat="server" Width="80px" MaxLength="3" Enabled="false"></asp:TextBox></td>
                                      <td><ttgInfo:ToolTipGenerico ID="ttgInfoCabecera_6" runat="server" Mensaje="" /></td>
                                    </tr>
                                  </table>
                                </td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </cc1:ContenedorTabJQ>

            </cc1:TabJQ>
        </div>
        <!-- ================================================================================
            AGREGAR CAMPOS
        ================================================================================ -->
        <div id="dvCamposDetalle" style="display: none;">

            <table >
                <tr id="trCampo">
                    <td>Campo:</td>
                    <td style="height:20px;">
                        <asp:Label ID="lblCampo" runat="server" Text=""></asp:Label>
                        <asp:DropDownList ID="ddlCampo" runat="server" Width="249px"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trTipo" style="display:none ;">
                    <td>Tipo Concepto:</td>
                    <td style="height:20px;">
                        <asp:Label ID="lblTipo" runat="server" Text=""></asp:Label>
                        <asp:DropDownList ID="ddlTipoServicioImportador" runat="server"></asp:DropDownList>
                    </td>
                </tr>
                <tr id="trServicio" style="display:none ;">
                    <td>Concepto:</td>
                    <td style="height:20px;">
                        <asp:Label ID="lblServicio" runat="server" Text=""></asp:Label>
                        <asp:DropDownList ID="ddlServicio" runat="server" Visible="false"></asp:DropDownList>
                        <asp:DropDownList ID="ddlServicioResumenCosto" runat="server" Width="260" Visible="false"></asp:DropDownList>
                        <asp:DropDownList ID="ddlServicioResumenConsumo" runat="server" Width="260" Visible="false"></asp:DropDownList>
                        <asp:DropDownList ID="ddlListaConceptos" Width="260" runat="server">
                         <asp:ListItem Text="<Seleccionar>" Value="-1" selected="true"></asp:ListItem>
                        </asp:DropDownList>
                        <asp:DropDownList ID="ddlCampoServicio" Width="260" runat="server" style="display: none;"></asp:DropDownList>
                    </td>
                </tr>
                
                <tr id="trDescripcion" style="display:none;">
                    <td>Descripción:</td>
                    <td style="height:20px;">
                        <asp:TextBox ID="txtDescripcion" runat="server" Width="170px" MaxLength="200"></asp:TextBox>                    
                    </td>
                </tr>
                <tr>
                    <td>Posición:</td>
                    <td style="height:20px;">
                        <asp:TextBox ID="txtPosicion" runat="server" Width="50px" MaxLength="5"></asp:TextBox>
                    </td>
                </tr>
                <tr id="trLongitud" style="display: none;">
                    <td>Longitud:</td>
                    <td>
                        <asp:TextBox ID="txtLongitud" runat="server" Width="50px" MaxLength="5"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>

        <div style="display:none;">
            <asp:DropDownList ID="ddlServicioBack" runat="server"></asp:DropDownList>  
            <asp:DropDownList ID="ddlServicioFiltroBack" runat="server"></asp:DropDownList>  
        </div>
    </form>
</body>
</html>
