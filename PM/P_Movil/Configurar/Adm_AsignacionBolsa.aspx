<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Adm_AsignacionBolsa" Codebehind="Adm_AsignacionBolsa.aspx.vb" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link  href="../../Common/Styles/tree_component.css" rel="stylesheet" type="text/css" />
    <link  href="../../Common/Styles/style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>  
	<script type="text/javascript" src="../../Common/Scripts/jquery.dataTables.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.position.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.mouse.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.draggable.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.resizable.js"></script>
    <script src="../../Common/Scripts/jquery.listen.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/bubble.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Adm_AsignacionBolsa.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfOperadores" runat="server" Value=""/>
        <asp:HiddenField ID="hdfCuentas" runat="server" Value=""/>
        <asp:HiddenField ID="hdfTipoPerFac" runat="server" Value=""/>
        <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
        <div id="divMsgConfirmacion" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            ¡Se eliminará este registro!, ¿Desea continuar?
        </div>
        <div id="divMsgConfirmacion2" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            ¡Se eliminará esta linea al plan seleccionado!, ¿Desea continuar?
        </div>
        <div id="divLineasSinPlan" style="display:none;">
            <asp:DropDownList ID="ddlLineaSinPlan" runat="server"></asp:DropDownList>
        </div>
        <table width="100%">
            <tr>
                <td style="width:220px; vertical-align: top;">
                    <cc1:BarraNavegacionJQ ID="BarraNavegacionJQ2" runat="server">
                        <cc1:PanelBarraNavegacion runat="server" Titulo="Operador-Cuenta-Periodo" Width="210px" ID="PanelBarraNavegacion1">
                            <cc1:ItemBarraNavegacion Texto="Operador:" Seleccionable="false" Highlight="false">
                                <asp:DropDownList ID="ddlOperador" runat="server" Width="120px"></asp:DropDownList>
                            </cc1:ItemBarraNavegacion>
                            <cc1:ItemBarraNavegacion Texto="Cuenta:" Seleccionable="false" Highlight="false"> 
                                <asp:DropDownList ID="ddlCuenta" runat="server" Width="120px"></asp:DropDownList>
                            </cc1:ItemBarraNavegacion>
                            <cc1:ItemBarraNavegacion Texto="Periodo:" Seleccionable="false" Highlight="false">
                                <asp:Label ID="lblPeriodo" runat="server" Text=" --/--- - --/---"></asp:Label>
                            </cc1:ItemBarraNavegacion>
                        </cc1:PanelBarraNavegacion>
                        <cc1:PanelBarraNavegacion runat="server" Titulo="Grupo de empleado" Width="210px" ID="PanelBarraNavegacion3">
                            <cc1:ItemBarraNavegacion Texto="Grupos" Seleccionable="false" Highlight="false">
                                <asp:DropDownList ID="ddlGrupoEmpleado" runat="server" Width="120px"></asp:DropDownList>
                            </cc1:ItemBarraNavegacion>
                            <cc1:ItemBarraNavegacion Texto="Asignación" Seleccionable="false" Highlight="false">
                                <asp:DropDownList ID="ddlOpcionAsignacion" runat="server" Width="120px"></asp:DropDownList>
                            </cc1:ItemBarraNavegacion>
                            <cc1:ItemBarraNavegacion Texto="Costo" Seleccionable="false" Highlight="false">
                                <asp:Label ID="lblCosto" runat="server" Text=""></asp:Label>
                            </cc1:ItemBarraNavegacion>
                        </cc1:PanelBarraNavegacion>
                        <cc1:PanelBarraNavegacion runat="server" Titulo="Opciones de asignación" Width="210px" ID="PanelBarraNavegacion4">
                            <cc1:ItemBarraNavegacion Seleccionable="false" Highlight="false">
                                <asp:RadioButtonList ID="rbtnLst" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Text="Lineas" Selected="True" Value="1"></asp:ListItem>
                                    <asp:ListItem Text="Grupos" Selected="False" Value="2"></asp:ListItem>
                                    <asp:ListItem Text="Todos" Selected="False" Value="3"></asp:ListItem>
                                </asp:RadioButtonList>
                            </cc1:ItemBarraNavegacion>
                        </cc1:PanelBarraNavegacion>
                        <cc1:PanelBarraNavegacion runat="server" Titulo="Organización" Width="210px" ID="PanelBarraNavegacion5" Visible="false">
                            <cc1:ItemBarraNavegacion Seleccionable="false" Highlight="false">
                                <div class="demo" id="demo" runat="server">
	                                <ul id="ulArbol" runat="server">
	                                </ul>
                                </div>
                            </cc1:ItemBarraNavegacion>
                        </cc1:PanelBarraNavegacion>
                    </cc1:BarraNavegacionJQ>
                </td>
                <td style="vertical-align: top;">
                    <div id="divPlanes" style="display:none;">
                        <div id="btnAgregarPlan" class="btnNormal">                            
                            <asp:Image ID="imgAgregarPlan" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"/>
                            <a>Agregar plan</a>
                        </div>
                        <div id="btnModificarPlan" class="btnNormal">                            
                            <asp:Image ID="imgModificarPlan" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif"/>
                            <a>Modificar plan</a>
                        </div>
                        <div id="btnEliminarPlan" class="btnNormal">                            
                            <asp:Image ID="imgEliminarPlan" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif"/>
                            <a>Eliminar plan</a>
                        </div>
                        <asp:Repeater id="rpPlan" runat="server">
                            <HeaderTemplate>
                                <table id="gvPlan" width="400px" cellspacing="0" cellpadding="4" class="Grilla" rules="all" border="1" style="border-collapse:collapse;">
		                            <thead>
			                            <tr class="Grilla-HeaderStyle">
				                            <th scope="col">Codigo</th><th scope="col">Codigo Operador</th>
                                            <th scope="col"  style="width:350px;">Plan</th><th scope="col" style="width:50px;">Monto</th>
			                            </tr>
		                            </thead>
                                    <tbody>
                            </HeaderTemplate>
                            <ItemTemplate>
                                <tr class="Grilla-RowStyle">
                                    <td><%# Eval("P_inCod")%></td>
                                    <td><%# Eval("F_inCodOpe")%></td>
                                    <td style="width:350px;"><%# Eval("vcNom")%></td>
                                    <td style="width:50px;"><%# Eval("dcMon")%></td>
                                </tr>
                            </ItemTemplate>
                            <AlternatingItemTemplate>                        
                                <tr class="Grilla-AlternatingRowStyle">
                                    <td><%# Eval("P_inCod")%></td>
                                    <td><%# Eval("F_inCodOpe")%></td>
                                    <td style="width:350px;"><%# Eval("vcNom")%></td>
                                    <td style="width:50px;"><%# Eval("dcMon")%></td>
                                </tr>
                            </AlternatingItemTemplate>
                            <FooterTemplate>
                                </tbody>
                                </table>
                            </FooterTemplate>
                        </asp:Repeater>   
                        <br />
                        <br />
                        <div id="btnAgregarlinea" class="btnNormal">                            
                            <asp:Image ID="imgAgregarlinea" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"/>
                            <a>Agregar linea</a>
                        </div>
                        <div id="btnModificarlinea" class="btnNormal">
                            <asp:Image ID="imgModificarlinea" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif"/>
                            <a>Modificar linea</a>
                        </div>
                        <div id="btnEliminarlinea" class="btnNormal">                            
                            <asp:Image ID="imgEliminarlinea" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif"/>
                            <a>Eliminar linea</a>
                        </div>
                        <asp:Repeater id="rpLineaPlan" runat="server">
                            <HeaderTemplate>                            
                                <table id="gvLineaPlan" width="200px" cellspacing="0" cellpadding="4" class="Grilla" rules="all" border="1" style="border-collapse:collapse;">
		                            <thead>
			                            <tr class="Grilla-HeaderStyle">
				                            <th scope="col">Linea</th><th scope="col">Plan</th><th scope="col">Valor</th>
			                            </tr>
		                            </thead>
                                    <tbody>
                            </HeaderTemplate>
                            <ItemTemplate >
                                <tr class="Grilla-RowStyle">
                                    <td><%# Eval("P_dcNum")%></td>
                                    <td><%# Eval("inCodPla")%></td>
                                    <td><%# Eval("dcMon")%></td>
                                </tr>
                            </ItemTemplate>
                            <AlternatingItemTemplate>                        
                                <tr class="Grilla-AlternatingRowStyle">
                                    <td><%# Eval("P_dcNum")%></td>
                                    <td><%# Eval("inCodPla")%></td>
                                    <td><%# Eval("dcMon")%></td>
                                </tr>
                            </AlternatingItemTemplate>
                            <FooterTemplate>
                                </tbody>
                                </table>
                            </FooterTemplate>
                        </asp:Repeater>                    
                    </div>
                    <div id="divLibre" style="display:none;">
                        <div id="btnModificarMontoLibre" class="btnNormal">                            
                            <asp:Image ID="imgModificarMontoLibre" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif"/>
                            <a>Modificar monto</a>
                        </div>
                        <div id="divLinea" style="display:none;">                
                            <asp:Repeater id="rpLinea" runat="server">
                                <HeaderTemplate>                            
                                    <table id="gvLinea" cellspacing="0" cellpadding="4" class="Grilla" rules="all" border="1" style="border-collapse:collapse;">
		                                <thead>
			                                <tr class="Grilla-HeaderStyle">
				                                <th scope="col">Linea</th><th scope="col">CodOperador</th><th scope="col">Valor</th><th scope="col">CodCuenta</th>
                                                <th scope="col">CodEmpleado</th>
			                                </tr>
		                                </thead>
                                        <tbody>
                                </HeaderTemplate>
                                <ItemTemplate >
                                    <tr class="Grilla-RowStyle">
                                        <td><%# Eval("P_dcNum")%></td>
                                        <td><%# Eval("inCodOpe")%></td>
                                        <td><%# Eval("dcMon")%></td>
                                        <td><%# Eval("vcCodCue")%></td>
                                        <td><%# Eval("vcCodEmp")%></td>
                                    </tr>
                                </ItemTemplate>
                                <AlternatingItemTemplate>                        
                                    <tr class="Grilla-AlternatingRowStyle">
                                        <td><%# Eval("P_dcNum")%></td>
                                        <td><%# Eval("inCodOpe")%></td>
                                        <td><%# Eval("dcMon")%></td>
                                        <td><%# Eval("vcCodCue")%></td>
                                        <td><%# Eval("vcCodEmp")%></td>
                                    </tr>
                                </AlternatingItemTemplate>
                                <FooterTemplate>
                                    </tbody>
                                    </table>
                                </FooterTemplate>
                            </asp:Repeater>
                        </div>
                        <div id="divArea" style="display:none;">                        
                            <asp:Repeater id="rpGrupo" runat="server">
                                <HeaderTemplate>                            
                                    <table id="gvGrupo" cellspacing="0" cellpadding="4" class="Grilla" rules="all" border="1" style="border-collapse:collapse;">
		                                <thead>
			                                <tr class="Grilla-HeaderStyle">
				                                <th scope="col">Codigo</th><th scope="col">Grupo</th><th scope="col">Valor</th>
			                                </tr>
		                                </thead>
                                        <tbody>
                                </HeaderTemplate>
                                <ItemTemplate >
                                    <tr class="Grilla-RowStyle">
                                        <td><%# Eval("P_inCod")%></td>
                                        <td><%# Eval("vcNom")%></td>
                                        <td><%# Eval("PoliticaSolicitud.vcVal")%></td>
                                    </tr>
                                </ItemTemplate>
                                <AlternatingItemTemplate>                        
                                    <tr class="Grilla-AlternatingRowStyle">
                                        <td><%# Eval("P_inCod")%></td>
                                        <td><%# Eval("vcNom")%></td>
                                        <td><%# Eval("PoliticaSolicitud.vcVal")%></td>
                                    </tr>
                                </AlternatingItemTemplate>
                                <FooterTemplate>
                                    </tbody>
                                    </table>
                                </FooterTemplate>
                            </asp:Repeater>
                        </div>
                        <br />
                        <br />
                        <div id="divServicio" style="display:none;">
                            <asp:Repeater id="rpServicio" runat="server">
                                <HeaderTemplate>
                                    <table id="gvServicio" cellspacing="0" cellpadding="4" class="Grilla" rules="all" border="1" style="border-collapse:collapse;">
		                                <thead>
			                                <tr class="Grilla-HeaderStyle">
				                                <th scope="col">Codigo</th><th scope="col">Servicio</th><th scope="col">Asignado</th><th scope="col">Actual</th>
                                                <th scope="col">Acumulado</th>
			                                </tr>
		                                </thead>
                                        <tbody>
                                </HeaderTemplate>
                                <ItemTemplate >
                                    <tr class="Grilla-RowStyle" style="cursor:default;">
                                        <td><%# Eval("P_inCod")%></td>
                                        <td><%# Eval("vcNom")%></td>
                                        <td>
                                            <asp:TextBox ID="txtValorServicio" runat="server" Text='<%# Eval("dcMonMax")%>' Width="50px"></asp:TextBox>
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtAsignado" runat="server" Text='<%# Eval("dcAct")%>' Width="50px"></asp:TextBox>
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtActual" runat="server" Text='<%# Eval("dcAcu")%>' Width="50px"></asp:TextBox>
                                        </td>
                                    </tr>
                                </ItemTemplate>
                                <AlternatingItemTemplate>                        
                                    <tr class="Grilla-AlternatingRowStyle" style="cursor:default;">
                                        <td><%# Eval("P_inCod")%></td>
                                        <td><%# Eval("vcNom")%></td>
                                        <td>
                                            <asp:TextBox ID="txtValorServicio" runat="server" Text='<%# Eval("dcMonMax")%>' Width="50px"></asp:TextBox>
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtAsignado" runat="server" Text='<%# Eval("dcAct")%>' Width="50px"></asp:TextBox>
                                        </td>
                                        <td>
                                            <asp:TextBox ID="txtActual" runat="server" Text='<%# Eval("dcAcu")%>' Width="50px"></asp:TextBox>
                                        </td>
                                    </tr>
                                </AlternatingItemTemplate>
                                <FooterTemplate>
                                    </tbody>
                                    </table>
                                </FooterTemplate>
                            </asp:Repeater>
                        </div>                        
                        <div id="btnGuardar" class="btnNormal">                            
                            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                            <a>Guardar</a>
                        </div>
                    </div>
                    <h4 style="display:none;"></h4>
                </td>
                <td style="width:210px; vertical-align: top;">
                    <cc1:BarraNavegacionJQ ID="BarraNavegacionJQ3" runat="server">
                        <cc1:PanelBarraNavegacion runat="server" Titulo="Servicios" Width="200px" ID="PanelBarraNavegacion2">
                            <cc1:ItemBarraNavegacion Texto="Servicio" Seleccionable="false" Highlight="false">
                                <asp:DropDownList ID="ddlServicio" runat="server" Width="120px"></asp:DropDownList>
                            </cc1:ItemBarraNavegacion>
                            <cc1:ItemBarraNavegacion Texto="Máximo" Seleccionable="false" Highlight="false">
                                <asp:Label ID="lblMaximo" runat="server" Text="0.00"></asp:Label>
                            </cc1:ItemBarraNavegacion>
                            <cc1:ItemBarraNavegacion Texto="Disponible" Seleccionable="false" Highlight="false">
                                <asp:Label ID="lblDisponible" runat="server" Text="0.00"></asp:Label>
                            </cc1:ItemBarraNavegacion>
                        </cc1:PanelBarraNavegacion>
                        <cc1:PanelBarraNavegacion runat="server" Titulo="Búsqueda" Width="200px" ID="pbnBusqueda">
                            <cc1:ItemBarraNavegacion Texto="Búsqueda por:" Seleccionable="false" Highlight="false">
                            </cc1:ItemBarraNavegacion>
                            <cc1:ItemBarraNavegacion> 
                                <asp:DropDownList ID="ddlBusqueda" runat="server" style="margin-left:15px; font-weight:normal;" Width="150px">
                                <asp:ListItem Text="Empleado" Value="1"></asp:ListItem>
                                <asp:ListItem Text="Linea" Value="2"></asp:ListItem>
                                </asp:DropDownList>
                            </cc1:ItemBarraNavegacion>
                            <cc1:ItemBarraNavegacion>
                                <asp:TextBox ID="txtBusqueda" CssClass="txtBusqueda" runat="server" Text="Valor a filtrar" style="margin-left:15px; font-weight:normal;">
                                </asp:TextBox>
                            </cc1:ItemBarraNavegacion>
                            <cc1:ItemBarraNavegacion Texto="Área:">
                                <asp:Label ID="lblArea" runat="server" Text=""></asp:Label>
                            </cc1:ItemBarraNavegacion>
                        </cc1:PanelBarraNavegacion>
                    </cc1:BarraNavegacionJQ>      
                </td>
            </tr>        
        </table>
        <div id="dvCargando16" style="width: 220px; height: 140px;  position:fixed; top: 26px; left: 12px; z-index:10000; background-color:White; opacity: .7;  text-align: center; background-position: center center; display: none" >
            <img alt="" src="../../Common/Images/Mantenimiento/Cargando16.gif" style="margin-top:70px"/>
        </div>    
    </form>
</body>
</html>