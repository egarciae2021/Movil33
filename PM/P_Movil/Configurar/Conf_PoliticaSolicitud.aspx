<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Configurar_Conf_PoliticaSolicitud" Codebehind="Conf_PoliticaSolicitud.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
    <head runat="server">
        <title></title>
        <link  href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
        <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
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
        <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
        <script src="Conf_PoliticaSolicitud.js" type="text/javascript"></script>        
    </head>
    <body>
        <form id="form1" runat="server">
            <asp:HiddenField ID="hdfPolitica" runat="server" Value=""/>
            <asp:HiddenField ID="hdfUnidad" runat="server" Value=""/>  
            <asp:HiddenField ID="hdfTamPag" runat="server" Value=""/>          
            <asp:HiddenField ID="hdfPagLis" runat="server" Value=""/>
            <asp:HiddenField ID="hdfCodLinTip_X_User" runat="server" />
            <div id="dvCargando" class="dvCargando"></div> 
            <div id="divMsgConfirmacionGrupo" style="display:none;">
                <span class="ui-icon ui-icon-alert" style="float:left;"></span>
                ¡Al ser quitado, este grupo empleado no tendrá acceso para realizar solicitudes!,<br />¿Desea continuar?
            </div>
            <div id="divMsgConfirmacionEmpleado" style="display:none;">
                <span class="ui-icon ui-icon-alert" style="float:left;"></span>
                ¡Se quitará este empleado de las excepciones y tomará los límites del grupo al que pertenece!, ¿Desea continuar?
            </div>
            <div class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none; overflow: auto;">
                <table border="0">
                    <tr>
                        <td style="width:60px">
                            <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                        </td>
                        <td rowspan="2" valign="middle" style="width:200px">
                            En:&nbsp;
                            <asp:DropDownList ID="ddlBusqueda" runat="server" style="margin-left:15px; font-weight:normal;" Width="150px">
                                <asp:ListItem Value="vcGru">Grupo Empleado</asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td rowspan="2" valign="middle" style="width:220px">
                            Filtrar:&nbsp;
                            <asp:TextBox ID="txtBusqueda" CssClass="txtBusqueda" runat="server" Text="Valor a filtrar" style="margin-left:15px; font-weight:normal;" 
                                            width="140px" MaxLength="200"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                </table>
            </div>
            <br />
            <div class="dvPanel"  style="padding : 5px;  overflow: auto;">
                <table>
                    <tr>
                        <td>
                            <table id="tblPoliticaSolicitudxGrupo"></table>
                            <div id="pager"></div>
                        </td>
                        <td>
                            <table>
                                <tr>
                                    <td>
                                        <div id="btnAgregarGrupo" class="btnNormal" runat="server" style="width:180px;">                        
                                            <asp:Image ID="imgAgregarGrupo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                            <a>Agregar Grupo Empleado</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>                    
                                        <div id="btnCambiarValGrup" class="btnNormal" runat="server" style="width:180px;">
                                            <asp:Image ID="imgCambiarValGrup" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                            <a>Cambiar valor</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>                    
                                        <div id="btnQuitarGrupo" class="btnNormal" runat="server" style="width:180px;">
                                            <asp:Image ID="imgQuitarGrupo" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                            <a>Quitar Grupo Empleado</a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>            
            </div>
            <br />
            <div class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none;  overflow: auto;">
                <table border="0">
                    <tr>
                        <td style="width:60px">
                            <asp:Label ID="lblFiltroEmpleado" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                        </td>
                        <td rowspan="2" valign="middle" style="width:200px">
                            En:&nbsp;
                            <asp:DropDownList ID="ddlBusquedaEmpleado" runat="server" style="margin-left:15px; font-weight:normal;" Width="150px">
                                <asp:ListItem Value="vcEmp">Empleado</asp:ListItem>
                                <asp:ListItem Value="vcNomGru">Grupo Empleado</asp:ListItem>
                                <asp:ListItem Value="vcNomOrg">Área</asp:ListItem>
                                <asp:ListItem Value="vcNomCCO">Centro de Costo</asp:ListItem>
                            </asp:DropDownList>
                        </td>
                        <td rowspan="2" valign="middle" style="width:220px">
                            Filtrar:&nbsp;
                            <asp:TextBox ID="txtBusquedaEmpleado" CssClass="txtBusqueda" runat="server" Text="Valor a filtrar" style="margin-left:15px; font-weight:normal;" 
                                            width="140px" MaxLength="200"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                </table>
            </div>
            <br />
            <div class="dvPanel" style="padding : 5px;  overflow: auto;">
                <table>
                    <tr>
                        <td>
                            <table id="tblPoliticaSolicitudxEmpleado"></table>
                            <div id="pager2"></div>
                        </td>
                        <td>
                            <table>
                                <tr>
                                    <td>
                                        <div id="btnAgregarExcepcion" class="btnNormal" runat="server" style="width:180px;">
                                            <asp:Image ID="imgAgregarExcepcion" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                            <a>Agregar excepción</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="btnCambiarValEmpl" class="btnNormal" runat="server" style="width:180px;">
                                            <asp:Image ID="imgCambiarValEmpl" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                            <a>Cambiar valor</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="btnQuitarExcepcion" class="btnNormal" runat="server" style="width:180px;">
                                            <asp:Image ID="imgQuitarExcepcion" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                            <a>Quitar empleado</a>
                                        </div>
                                    </td>
                                </tr>
                            </table>                        
                        </td>
                    </tr>
                </table>
            </div>
            <div id="dvExcepcion" style="display:none; padding:0px; margin:0px;">
                <iframe id="ifExcepcion" frameborder="0" style="padding:0px; margin:0px;"></iframe>
            </div>
            <div id="dvArea" style="display:none;padding:0px; margin:0px;">
                <iframe id="ifArea" width="730" height="470" frameborder="0" style="padding:0px; margin:0px;"></iframe>
            </div>
        </form>
    </body>
</html>
