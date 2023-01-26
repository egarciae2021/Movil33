<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Con_SeleccionArea.aspx.vb" Inherits=".Con_SeleccionArea_Fija" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <link href="../../Scripts/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />
        <link href="../../Styles/Principal.css" rel="stylesheet" type="text/css" />
        <link href="../../Common/Styles/dhtmlxtree.css" rel="stylesheet" type="text/css" />
        
        <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/dhtmlx/dhtmlxcommon.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/dhtmlx/dhtmlxtree.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/dhtmlx/ext/dhtmlxtree_json.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
        <script src="Con_SeleccionArea.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    
    <div id="dvCargando" class="dvCargando"></div>
            <asp:HiddenField ID="hdfTipo" runat="server" />
            <asp:HiddenField ID="hdfMultiple" runat="server" /> 
            <asp:HiddenField ID="hdfEmpleado" runat="server" />        
            <asp:HiddenField ID="hdfUnPanel" runat="server" />        
            <table>
                <tr>
                    <td id="tdOpciones" runat="server">                        
                        <cc1:TabJQ ID="TabOpciones" runat="server" CssClass="tabs" style="margin: 0px; padding: 0px;">
                            <cc1:ContenedorTabJQ Titulo="Organización" Height="360px" Width="290px">  
                                <table>
                                    <tr>
                                        <td>
                                            <div class="dhtmlxTree dvPanel" id="dvOrganizacion" style="width:260px; height:300px;overflow:auto;"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <asp:CheckBox ID="chkIncluirDependencia" runat="server" Text="Incluir información de dependecia"/>
                                        </td>
                                    </tr>
                                </table>
                            </cc1:ContenedorTabJQ>
                            <cc1:ContenedorTabJQ ID="ctbBusquedaAvanzada" Titulo="Búsqueda avanzada" Height="360px" Width="290px">
                                <br />
                                &nbsp;&nbsp;<asp:TextBox ID="txtBusqueda" runat="server" MaxLength="50"></asp:TextBox>
                                <div id="btnBuscar" class="btnNormal" runat="server">
                                    <asp:Image ID="imgBuscar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/lupa_16x16.png" />
                                    <a>Búsqueda</a>
                                </div>
                            </cc1:ContenedorTabJQ>
                        </cc1:TabJQ>
                    </td>
                    <td id="tdDatosSeleccion" runat="server">
                        <div id="dvDatosSeleccion" style="width:100%; text-align:center; font-weight:bold;" runat="server"></div>
                        <asp:ListBox ID="lstResultado" runat="server" Height="380px" Width="180px" SelectionMode="Multiple" style="color: #222222;"></asp:ListBox>
                    </td>
                    <td id="tdControles" runat="server" style="width:40px;">
                        <div id="btnDerecha" class="btnNormal" runat="server" style="width:40px;">
                            <a>></a>
                        </div>
                        <div id="btnIzquierda" class="btnNormal" runat="server" style="width:40px;">
                            <a><</a>
                        </div>
                        <div id="btnDerechaTodo" class="btnNormal" runat="server" style="width:40px;">
                            <a>>></a>
                        </div>
                        <div id="btnIzquierdaTodo" class="btnNormal" runat="server" style="width:40px;">
                            <a><<</a>
                        </div>                        
                    </td>
                    <td id="tdDatosSeleccionados" runat="server">
                        <div style="width:100%; text-align:center; font-weight:bold;">
                            Datos seleccionados
                        </div>
                        <asp:ListBox ID="lstSeleccionados" runat="server" Height="380px" Width="180px" SelectionMode="Multiple" style="color: #222222;"></asp:ListBox>                    
                    </td>
                </tr>
                <tr>
                    <td>
                        <div id="dvEstado" runat="server" class="dvPanel">
                            <asp:Label ID="lblEtiquetaVer" runat="server" Text="Ver"></asp:Label>&nbsp;
                            <asp:DropDownList ID="ddlEstado" runat="server">
                                <asp:ListItem Value="-1" Text="Todos"></asp:ListItem>
                                <asp:ListItem Value="1" Text="Vigentes" Selected="True"></asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </td>
                    <td colspan="3" align="right">
                        <div id="btnAceptar" class="btnNormal" runat="server">
                            <asp:Image ID="imgAceptar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Aceptar</a>
                        </div>
                        <div id="btnCancelar" class="btnNormal" runat="server">
                            <asp:Image ID="imgCancelar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                            <a>Cancelar</a>
                        </div>                    
                    </td>
                </tr>
            </table>
    </form>
</body>
</html>
