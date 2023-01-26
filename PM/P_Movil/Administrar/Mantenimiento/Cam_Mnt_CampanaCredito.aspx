<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Cam_Mnt_CampanaCredito" Codebehind="Cam_Mnt_CampanaCredito.aspx.vb" %>

<%@ Register Src="../../../Common/Controles/ToolTipGenerico.ascx" TagName="ToolTipGenerico" TagPrefix="ttgInfo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/jqGrid/ui.jqgrid.css" />
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" />
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/KendoUI/kendo.common.min.css" />
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" />
    
    <script type="text/javascript" src="../../../Common/Scripts/json2.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/knockout-2.3.0.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery-ui.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/jquery.uniform.min.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" ></script>
    <script type="text/javascript" src="../../../Common/Scripts/Utilitario.js" ></script>

    <script type="text/javascript" src="../../../Common/Scripts/KendoUI/kendo.web.min.js"></script>
    <script type="text/javascript" src="../../../Common/Scripts/KendoUI/kendo.datepicker.min.js"></script>

    <script type="text/javascript" src="Cam_Mnt_CampanaCredito.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfSepDecimal" runat="server" />
        <asp:HiddenField ID="hdfSepMiles" runat="server" />
        <asp:HiddenField ID="hdfNumDecimales" runat="server" />
        <asp:HiddenField ID="hdfIdCampana" runat="server" />        
    <div class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none; overflow: auto; display:none;">
        <table>
            <tr>
                <td style="width:100px;">Campaña Activa: </td>
                <td>
                    <asp:DropDownList ID="ddlCampanaActiva" runat="server" Width="400px"></asp:DropDownList>
                </td>
            </tr>
        </table>
    </div>
<%--    <br />--%>
        <%--<div class="ui-widget-content ui-corner-all" style="background-image:none;  overflow: auto; margin-bottom :3px;">--%>
            <table border="0" width="100%">
                <tr>
                    <td>
                        <table id="tbFiltroGrupo" width="100%">
                            <tr>
                                <td valign="middle" style="padding-top:8px; padding-bottom:8px;">
                                    <asp:DropDownList ID="ddlBusquedaGrupo" runat="server" style="font-weight:normal;" Width="160px">
                                        <asp:ListItem Value="vcGru">Grupo Empleado</asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                                <td valign="middle" style="width:20px">
                                    <asp:TextBox ID="txtBusquedaGrupo" CssClass="txtBusqueda" runat="server" Text="Valor a filtrar" style="margin-left:5px; font-weight:normal;" 
                                    width="170px" MaxLength="200"></asp:TextBox>
                                </td>
                                <td valign="middle" align="right" style="width:50px;">
                                    <div id="btnEditarCreditoGrupo" class="btnNormal" runat="server" style="width:40px;">
                                        <asp:Image ID="Image5" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" ToolTip="Editar crédito grupo"/>
                                    </div>                                        
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="width:10px;">
                    </td>
                    <td>
                        <table id="tbFiltroEmpleado" width="100%">
                            <tr>
                                <td valign="middle" >
                                    <asp:DropDownList ID="ddlBusquedaEmpleado" runat="server" style="font-weight:normal;" Width="160px">
                                        <asp:ListItem Value="vcEmp">Empleado</asp:ListItem>
                                        <asp:ListItem Value="vcNomGru">Grupo Empleado Staff</asp:ListItem>
                                        <asp:ListItem Value="vcNomOrg">Área</asp:ListItem>
                                        <asp:ListItem Value="vcNomCCO">Centro de Costo</asp:ListItem>
                                        <asp:ListItem value="vcNomGruFam">Grupo Familia</asp:ListItem>
                                    </asp:DropDownList>
                                </td>
                                <td>
                                    <table cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <input type="checkbox" id="chkExceptos" />
                                            </td>
                                            <td>
                                                <div id="dvInfoBuscarAreas">                                        
                                                    <ttgInfo:ToolTipGenerico ID="ttgInforBuscarAreas" runat="server" Mensaje="Filtra exceptos"/>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td valign="middle" style="width:300px">
                                    <asp:TextBox ID="txtBusquedaEmpleado" CssClass="txtBusqueda" runat="server" Text="Valor a filtrar" style="margin-left:15px; font-weight:normal;" 
                                    width="200px" MaxLength="200"></asp:TextBox>
                                </td>
                                <td>
                                    <div id="btnEditarCreditoEmpleado" class="btnNormal" runat="server" style="width:40px;">
                                        <asp:Image ID="Image2" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" ToolTip="Editar crédito empleado"/>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    
                </tr>
                <%--<tr>
                    <td colspan="7">&nbsp;</td>
                </tr>--%>
                <tr>
                    <td>
                        <table id="tblCreditoGrupo"></table>
                        <div id="pagerCreditoGrupo"></div>
                    </td>
                    <td>
                    
                    </td>
                    <td>
                        <table width="100%" id="tblCreditoEmpleado"></table>
                        <div id="pagerCreditoEmpleado"></div>
                    </td>

                </tr>
            </table>
            <table width="100%" style="display:none;">
                <tr>
                    <td>
                        <div id="btnAgregarCreditoGrupo" class="btnNormal" runat="server" style="width:90px; display:none;">
                            <asp:Image ID="Image6" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                            <a>Agregar</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                                    
                    </td>
                </tr>
                <tr>
                    <td>                    
                        <div id="btnQuitarCreditoGrupo" class="btnNormal" runat="server" style="width:90px; display:none;">
                            <asp:Image ID="Image4" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                            <a>Quitar</a>
                        </div>
                    </td>
                </tr>
            </table>
        <%--</div>--%>
        <div class="ui-widget-content ui-corner-all" style=" background-image:none; overflow: auto; margin-top :3px; display:none;">
            <table border="0">
                <tr>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                </tr>
            </table>
            <table width="100%">
                <tr>
                    <td>
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <div id="btnAgregarCreditoEmpleado" class="btnNormal" runat="server" style="width:90px; display:none;">
                                        <asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                        <a>Agregar</a>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td>                    
                                    <div id="btnQuitarCreditoEmpleado" class="btnNormal" runat="server" style="width:90px; display:none;">
                                        <asp:Image ID="Image3" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                        <a>Quitar</a>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divAgregarCreditoGrupo" runat="server" style="display:none;  overflow: auto;">
            <table>
                <tr>
                    <td colspan="2">
                        <table id="tblGrupoOrigen"></table>
                        <div id="pagerGrupoOrigen"></div>
                    </td>
                </tr>
                <tr>
                    <td style="width:100px;">Tipo de Crédito: </td>
                    <td>
                        <asp:DropDownList ID="ddlTipoCreditoGrupo" runat="server" Width="150px"></asp:DropDownList>
                    </td>
                </tr>
                <tr>
                    <td>Aprobado: </td>
                    <td><asp:TextBox ID="txtAprobadoGrupoOrigen" runat="server" Width="140px" MaxLength="18"></asp:TextBox></td>
                </tr>
                <tr>
                    <td colspan="2" align="right">
                        <div style="border-top:1px;">
                            <div id="btnGrabarCreditoGrupo" class="btnNormal" runat="server" style="width:90px;">
                                <asp:Image ID="Image7" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                                <a>Grabar</a>
                            </div>
                            <div id="btnCerrarDialogGrupo" class="btnNormal" runat="server" style="width:90px;">
                                <asp:Image ID="Image8" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                                <a>Salir</a>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divEditarCreditoGrupo" runat="server" style="display:none;  overflow: auto;">
            <table width="100%">
                <tr>
                    <td style="width:100px;">Tipo de Crédito: </td>
                    <td>
                        <asp:Label ID="lblTipCredGrup" runat="server"></asp:Label>
                        <asp:HiddenField ID="hdfCredGrup_TipCred" runat="server" />
                    </td>
                </tr>
                <tr>
                    <td>Nombre de Grupo: </td>
                    <td>
                        <asp:Label ID="lblGrupoEdit" runat="server"></asp:Label>
                        <asp:HiddenField ID="hdfCredGrup_Grup" runat="server" />
                    </td>
                </tr>
                <tr>
                    <td>Crédito Aprobado: </td>
                    <td><asp:TextBox ID="txtAprobEditGrup" runat="server" MaxLength="18"></asp:TextBox></td>
                </tr>
                <tr>
                    <td colspan="2" align="right">
                        <div id="btnGuardarEditGrupo" class="btnNormal" runat="server" style="width:90px;">
                            <asp:Image ID="Image9" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Grabar</a>
                        </div>
                        <div id="btnCerrarEditGrupo" class="btnNormal" runat="server" style="width:90px;">
                            <asp:Image ID="Image10" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                            <a>Cerrar</a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divMsgConfirmacionGrupo" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            <%--¡Al ser quitado, este grupo Empleado no tendrá acceso para realizar solicitudes!, ¿Desea continuar?--%>
            ¿Desea eliminar los Grupo de Empleado seleccionados?
        </div>
        <div id="divAgregarCreditoEmpleado" runat="server" style="display:none;">
            <table>
                <tr>
                    <td>
                        <div id="btnSeleccionEmpleado" class="btnNormal" runat="server">
                            <img alt="Cliente" src="../../../Common/Images/Mantenimiento/Clientes.png" />                            
                        </div>
                        <asp:Label ID="lblEtiq" runat="server" Text=""></asp:Label>
                    </td>
                    <td>
                        <asp:ListBox ID="lstEmpleado" runat="server" Width="350px" Height="76px"></asp:ListBox>
                    </td>
                </tr>
                <tr>
                    <td style="width:100px;">Tipo de Crédito: </td>
                    <td>
                        <asp:DropDownList ID="ddlTipoCreditoEmpleado" runat="server" Width="150px"></asp:DropDownList>
                        <span style="padding-left: 175px;">
                            <asp:Image ID="imgQuitarEmp" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif"
                                CssClass="imgBtn" ToolTip="Quitar Empleado" />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:Label ID="lblAprobado" runat="server" Text="Aprobado"></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtAprobadoEmpleado" runat="server" Width="140px" MaxLength="18"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="right">
                        <div id="btnGrabarCreditoEmpleado" class="btnNormal" runat="server">
                            <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Grabar</a>
                        </div>
                        <div id="btnCerrarDialoEmpleado" class="btnNormal" runat="server">
                            <asp:Image ID="imgCancelar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                            <a>Salir</a>
                        </div>
                    </td> 
                </tr>
            </table>
        </div>
        <div id="divSeleccionEmpleado" runat="server" style="display:none;">
            <iframe id="ifSeleccionEmpleado" frameborder="0" style="padding:0px; margin:0px;"
                width="715px" height="460px";></iframe>
        </div>
        <div id="divEditarCreditoEmpleado" runat="server" style="display:none;">
            <table width="100%">
                <tr>
                    <td style="width:100px;">Tipo de Crédito: </td>
                    <td>
                        <asp:Label ID="lblTipCredEmp" runat="server"></asp:Label>
                        <asp:HiddenField ID="hdfCredEmp_TipCred" runat="server" />
                    </td>
                </tr>
                <tr>
                    <td>Nombre Empleado: </td>
                    <td>
                        <asp:Label ID="lblEmpladoEdit" runat="server"></asp:Label>
                        <asp:HiddenField ID="hdfCredEmp_Emp" runat="server" />                       
                    </td>
                </tr>
                <tr>
                    <td>Crédito Aprobado: </td>
                    <td><asp:TextBox ID="txtAprobadoEditEmp" runat="server" MaxLength="18"></asp:TextBox></td>
                </tr>
                <tr>
                    <td colspan="2" align="right">
                        <div id="btnGuardarEditEmpleado" class="btnNormal" runat="server" style="width:90px;">
                            <asp:Image ID="Image11" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Grabar</a>
                        </div>
                        <div id="btnCerrarEditEmpleado" class="btnNormal" runat="server" style="width:90px;">
                            <asp:Image ID="Image12" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                            <a>Cerrar</a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="divMsgConfirmacionEmpleado" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            ¿Desea eliminar los Empleados seleccionados?
        </div>
        <div id="divMsgConfirmInsertarExistente" style="display:none;">
            <table width="100%">
                <tr>
                    <td colspan="2">
                        <span class="ui-icon ui-icon-alert" style="float:left;"></span>
                        Los siguientes <asp:Label ID="lblMsg1" runat="server"></asp:Label> ya estan registrados.
                    </td>
                </tr>
                <tr>
                    <td style="width:40px;"></td>
                    <td>
                        <div id="divExistentes" runat="server">
                            <ul></ul>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <%--<span class="ui-icon ui-icon-help" style="float:left;"></span>--%>
                        ¿Desea reemplazar el monto Aprobado para estos <asp:Label ID="lblMsg2" runat="server"></asp:Label>?
                    </td>
                </tr>
            </table>
        </div>
    </form>
</body>
</html>
