<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Cam_Mnt_CampanaListaNegra" Codebehind="Cam_Mnt_CampanaListaNegra.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/jqGrid/ui.jqgrid.css" />
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" />
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/KendoUI/kendo.common.min.css" />
    <link rel="stylesheet" type="text/css" href="../../../Common/Styles/KendoUI/kendo.blueopal.min.css" />
    
    <link href="../../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    <script type="text/javascript" src="../../../Common/Scripts/KendoUI/kendo.web.min.js"></script>
    <script src="Cam_Mnt_CampanaListaNegra.js" type="text/javascript"> </script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfPolitica" runat="server" Value=""/>
        <asp:HiddenField ID="hdfUnidad" runat="server" Value=""/>
        <asp:HiddenField ID="hdfTamPag" runat="server" Value=""/>
        <asp:HiddenField ID="hdfPagLis" runat="server" Value=""/>        
        <asp:HiddenField ID="hdfIdCampana" runat="server" Value=""/>
         
        <div id="divMsgConfirmacionGrupo" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            ¡Al ser quitado, este grupo empleado no tendrá acceso para realizar solicitudes!, ¿Desea continuar?
        </div>
        <div id="divMsgConfirmacionEmpleado" style="display:none;">
            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
            ¡Se quitará este empleado de las excepciones y tomará los límites del grupo al que pertenece!, ¿Desea continuar?
        </div>
       <%-- <div class="ui-widget-content ui-corner-all" style="padding:0px; margin:0px; background-image:none; overflow: auto;">--%>
            <table border="0">
                <tr>
                    <td style="width:60px;">
                        <asp:Label ID="lblFiltro" runat="server" Text="Filtro" CssClass="lblToolBAR"></asp:Label>
                    </td>
                    <td rowspan="2" valign="middle" style="width:270px;display:none;">
                        Campañas:&nbsp;
                        <asp:DropDownList ID="ddlCampana" runat="server" style="margin-left:15px; font-weight:normal;" Width="180px">
                        </asp:DropDownList>&nbsp;&nbsp;&nbsp;&nbsp;
                    </td>
                    <td rowspan="2" valign="middle" style="width:170px">
                        En:&nbsp;
                        <asp:DropDownList ID="ddlTipo" runat="server" style="margin-left:15px; font-weight:normal;" Width="110px">
                                <asp:ListItem Value="0" Selected="True">Seleccione</asp:ListItem>
                                <asp:ListItem Value="1">Código</asp:ListItem>
                                <asp:ListItem Value="2">Nombre</asp:ListItem>
                        </asp:DropDownList>&nbsp;&nbsp;&nbsp;&nbsp;
                    </td>
                    <td rowspan="2" valign="middle" style="width:300px">
                        Filtrar:&nbsp;
                        <asp:TextBox ID="TxtValor" runat="server" Width="200px"></asp:TextBox>
                    </td>
                </tr>
            </table>
<%--        <br />--%>
                <table>
                    <tr>
                        <td>
                            <table id="tblListaNegra"></table>
                            <div id="pagerListaNegra"></div>
                        </td>
                        <td>
                            <table>
                                <tr>
                                    <td>
                                        <div id="btnAgregarListaNegra" class="btnNormal" runat="server" style="width:100px;">
                                            <asp:Image ID="imgAgregarListaNegra" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif" />
                                            <a>Agregar</a>
                                        </div>
                                    </td>
                                </tr>
<%--                                <tr>
                                    <td>                    
                                        <div id="btnEditarListaNegra" class="btnNormal" runat="server" style="width:100px;">
                                            <asp:Image ID="imgEditarListaNegra" runat="server" ImageUrl="~/Common/Images/Mantenimiento/edit_16x16.gif" />
                                            <a>Editar</a>
                                        </div>
                                    </td>
                                </tr>--%>
                                <tr>
                                    <td>                    
                                        <div id="btnQuitarListaNegra" class="btnNormal" runat="server" style="width:100px;">
                                            <asp:Image ID="imgQuitarListaNegra" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Quitar.png" />
                                            <a>Quitar</a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>            
<%--            </div>--%>
<%--            <br />--%>
            <div id="dvExcepcion" style="display:none; padding:0px; margin:0px;">
                <iframe id="ifExcepcion" frameborder="0" style="padding:0px; margin:0px;"></iframe>
            </div>
            <div id="dvArea" style="display:none;padding:0px; margin:0px;">
                <iframe id="ifArea" width="730" height="470" frameborder="0" style="padding:0px; margin:0px;"></iframe>
            </div>
            <div id="divMsgConfirmacionAhora" style="display: none;">
                <table width="100%">
                    <tr>
                        <td colspan="2">
                            <span class="ui-icon ui-icon-alert" style="float:left;"></span>
                            Los siguientes Empleados ya estan registrados: <br /><b><span id="lblMsg2"></span></b> 
                        </td>
                    </tr>
                </table>
            </div>
    </form>
</body>
</html>