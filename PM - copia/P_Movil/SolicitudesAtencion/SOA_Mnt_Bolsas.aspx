<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Solicitudes_de_atencion_SOA_Mnt_Bolsas" Codebehind="SOA_Mnt_Bolsas.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
<%--    <script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js"></script>

    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
    <script src="../../Common/Scripts/jquery.cookie.js" type="text/javascript"></script>--%>

    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/anytime.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>

    
    <link href="SOA_Mnt_Bolsas.css" rel="stylesheet" type="text/css" />
    <script src="SOA_Mnt_Bolsas.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfAdmin" runat="server" />
        <asp:HiddenField ID="hdfIdUsuarioLogeado" runat="server" />
        <asp:HiddenField ID="hdfEmpleado" runat="server" />
        <asp:HiddenField ID="hdfIdTecnico" runat="server" />
        <asp:HiddenField ID="hdfIdBolsa" runat="server" />

            <div id="dvMantenimiento" class="dvPanel">
                <table >
<%--                    <tr>
                        <td align="center" colspan="2" style="font-weight:bold; font-size:10pt;" >Bolsas</td>
                        <td><div class="boton" id="btnVerArbol">Ver dependencias</div></td>
                    </tr>--%>
                    <tr>                    
                        <td>Nombre</td>                
                        <td><asp:TextBox ID="txtNombre" runat="server" Width="300" MaxLength="50"></asp:TextBox></td>
                    </tr>
                    <tr>                    
                        <td>Descripción:</td>                
                        <td><asp:TextBox ID="txtDescripcion" runat="server" Width="300" MaxLength="100"></asp:TextBox></td>
                    </tr>
                    <tr>                    
                        <td>Nivel</td>                
                        <td>
                            <asp:DropDownList ID="ddlNivel" runat="server" Width="100" >
                            </asp:DropDownList>
                        </td>
                    </tr>
                    <tr>
                        <td>Escalar a</td>
                        <td>
                            <asp:DropDownList ID="ddlBolsasEscalar" runat="server" Width="250">
                            </asp:DropDownList>   
                            
                            <div id="btnAgregar" class="btnNormal" >
                                <asp:Image ID="imgAgregar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/add_16x16.gif"
                                CssClass="imgBtn" ToolTip="Agregar" />
                            </div>

                            <div id="btnQuitar" class="btnNormal" >
                                <asp:Image ID="imgQuitar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/delete_16x16.gif"
                                CssClass="imgBtn" ToolTip="Quitar" />      
                            </div>
                            <div id="btnVerArbol" class="btnNormal" >
                                <%--<asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/ArbolBolsas.png"/>--%>
                                <div style="height:12px;">Ver Dependencias</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Bolsas elegidas</td>
                        <td colspan="2" >
                            <asp:ListBox ID="listaBolsas" runat="server" Width="250">
                            </asp:ListBox>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Escalamiento Externo
                        </td>
                        <td>
                            <asp:CheckBox ID="chkEsExterno" runat="server" />
                        </td>
                    </tr>
                    <tr id="trAutomatico">
                        <td>
                            Automatico
                        </td>
                        <td>
                            <asp:CheckBox ID="chkAutomatico" runat="server" />
                        </td>
                    </tr>
<%--                    <tr>
                        <td align="center" colspan="2"  ><div class="boton" id="btnGuardar">Guardar</div></td>
                    </tr>--%>
                    <tr id="EsChkActivar">                    
                        <td >Activo</td>                                    
                        <td><asp:CheckBox ID="chkActivo" runat="server" /></td>
                    </tr>
                </table>
            </div>
            
            <div style="text-align:left; padding-top: 12px">
                <div id="btnGuardar" class="btnNormal">
                    <asp:Image ID="imgGuardarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                    <a>Guardar</a>
                </div>
                <div id="btnCerrar" class="btnNormal">
                    <asp:Image ID="imgCerrarServicio" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                    <a>Cerrar</a>
                </div>

            </div>   
            
            <div id="dvArbol" >
                <iframe id="ifArbol" frameborder="0" style="padding: 0px; margin: 0px; height: 360px; width:380px;"></iframe>
            </div> 


    </form>
</body>
</html>
