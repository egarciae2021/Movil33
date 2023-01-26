<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Configurar_Conf_CostoReposicion" Codebehind="Conf_CostoReposicion.aspx.vb" %>

<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ"
    TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
        <link href="../../Common/Styles/anytime.css" rel="stylesheet" type="text/css" />        
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
        <script src="../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
        <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
        <script src="Conf_CostoReposicion.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <asp:HiddenField ID="hdfParametro" runat="server" />
    <asp:HiddenField ID="hdfFormulaInicial" runat="server" />
    <div id="dvCargando" class="dvCargando"></div>
    <div id="dvCampo" class="dvPanel" style="overflow:auto;">
        <table width="530px" border="0" id="tbCostoReposicion" runat="server"> 
            <tr>
                <td>Operador</td>
                <td>
                    <asp:DropDownList ID="ddlOperador" runat="server" Width="300px"></asp:DropDownList>
                </td>
            </tr>
            <tr id="trParametrosLeyenda" runat="server">
                <td colspan="2">
                    <cc1:BarraNavegacionJQ ID="bnMantenimiento" runat="server">
                        <cc1:PanelBarraNavegacion ID="pbnMovil" runat="server" Titulo="Valores Permitidos" MostrarIcono="true" Mostrar="true" Width="100%" Height="180px">
                            <cc1:ItemBarraNavegacion ID="ItemBarraNavegacion2" runat="server" Activo="true" Click="" Font-Bold="false" Seleccionable="false" UrlIco="">
                                <table style="padding-left:20px; margin-right:20px;">
                                   <tr>
                                       <td class="tdEtiqueta" colspan="2">
                                           <asp:Label ID="lblParametros" runat="server" Text="Parámetros"></asp:Label>
                                       </td>
                                       <td class="tdEtiqueta" align="center">
                                           <asp:Label ID="lblOperadores" runat="server" Text="Operadores/Separadores"></asp:Label>
                                       </td>
                                   </tr>
                                   <tr>
                                       <td class="tdEtiqueta" style="padding-left:10px; width:50px;" >
                                           <asp:Label ID="lblParametro1" runat="server" Text="A: "></asp:Label>
                                       </td>
                                       <td class="tdEtiqueta">
                                            <asp:DropDownList ID="ddlParametro1" runat="server" Width="250px"></asp:DropDownList>
                                       </td>
                                       <td class="tdEtiqueta" align="center">
                                           <asp:Label ID="lblMasMenos" runat="server" Text="+ -"></asp:Label>
                                       </td>
                                   </tr>
                                   <tr>
                                       <td class="tdEtiqueta" style="padding-left:10px;">
                                           <asp:Label ID="lblParametro2" runat="server" Text="B: "></asp:Label>
                                       </td>
                                       <td class="tdEtiqueta">
                                            <asp:DropDownList ID="ddlParametro2" runat="server" Width="250px"></asp:DropDownList>
                                       </td>
                                       <td class="tdEtiqueta" align="center">
                                           <asp:Label ID="lblPorEntre" runat="server" Text="* /"></asp:Label>
                                       </td>
                                   </tr>
                                   <tr>
                                       <td class="tdEtiqueta" style="padding-left:10px;">
                                           <asp:Label ID="lblParametro3" runat="server" Text="C: "></asp:Label>
                                       </td>
                                       <td class="tdEtiqueta">
                                            <asp:DropDownList ID="ddlParametro3" runat="server" Width="250px"></asp:DropDownList>
                                       </td>
                                       <td class="tdEtiqueta" align="center">
                                           <asp:Label ID="lblParentesis" runat="server" Text="( )"></asp:Label>
                                       </td>
                                   </tr>
                                   <tr>
                                       <td class="tdEtiqueta" style="padding-left:10px;">
                                           <asp:Label ID="lblParametro4" runat="server" Text="D: "></asp:Label>
                                       </td>
                                       <td class="tdEtiqueta">
                                            <asp:DropDownList ID="ddlParametro4" runat="server" Width="250px"></asp:DropDownList>
                                       </td>
                                       <td class="tdEtiqueta" align="center">
                                           <asp:Label ID="lbl4" runat="server" Text=""></asp:Label>
                                       </td>
                                   </tr>
                                   <tr>
                                       <td class="tdEtiqueta" style="padding-left:10px;">
                                           <asp:Label ID="lblParametro5" runat="server" Text="E: "></asp:Label>
                                       </td>
                                       <td class="tdEtiqueta">
                                            <asp:DropDownList ID="ddlParametro5" runat="server" Width="250px"></asp:DropDownList>
                                       </td>
                                       <td class="tdEtiqueta" align="center">
                                           <asp:Label ID="lbl5" runat="server" Text=""></asp:Label>
                                       </td>
                                   </tr>
                                </table>
                            </cc1:ItemBarraNavegacion>
                        </cc1:PanelBarraNavegacion>
                    </cc1:BarraNavegacionJQ>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <div id="dvCondiciones" style="padding-left:10px; padding-top:8px;">
                        <asp:Label runat="server" ID="lblCondicion1" ForeColor="#4297d7" Font-Size="12px">
                            * Las operaciones entre datos tipo fecha darán como resultado un número entero (meses).
                        </asp:Label>
                        <br />
                        <asp:Label runat="server" ID="lblCondicion2" ForeColor="#4297d7" Font-Size="12px">
                            ** Las operaciones entre datos de tipo fecha y otro tipo de datos no están permitidas.
                        </asp:Label>
                    </div>
                </td>
            </tr>
            <tr style="height: 15px;">
                <td colspan="2"></td>
            </tr>
            <tr>
                <td style="width:40px;">
                    <asp:Label ID="lblFormula" runat="server" Text="Fórmula"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="txtFormula" runat="server" Width="150px" MaxLength="200"></asp:TextBox>
                    <asp:Label ID="lblValorFormula" runat="server" Text=""></asp:Label>
                </td>
            </tr>
            <tr style="padding-top:20px;">
                <td colspan="2">
                <br />
                <div style="text-align:left;">            
                    <div id="btnGuardar" class="btnNormal">
                        <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png"/>
                        <a>Guardar</a>
                    </div>
                    <div id="btnCerrar" class="btnNormal">
                        <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif"/>
                        <a>Cancelar</a>
                    </div>
                </div>
                </td>
            </tr>
        </table>
    </div>
    </form>
</body>
</html>
