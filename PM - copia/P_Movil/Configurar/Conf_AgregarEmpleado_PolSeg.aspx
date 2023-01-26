<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Configurar_Conf_AgregarEmpleado_PolSeg" Codebehind="Conf_AgregarEmpleado_PolSeg.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
	<script type="text/javascript" src="../../Common/Scripts/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>  
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.autocomplete.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Entidades/ENT_MOV_IMP_Criterio.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfPolitica" runat="server" />
        <asp:HiddenField ID="hdfGrupo" runat="server" />
        <asp:HiddenField ID="hdfEmpleado" runat="server" />
        <asp:HiddenField ID="hdfTipEmp" runat="server" />
        <asp:HiddenField ID="hdfNomEmp" runat="server" />
        
        <div id="dvCargando" class="dvCargando"></div>
        <div class="dvPanel">        
            <table>

                <tr>
                    <td>
                        <div id="btnEmpleado" class="btnNormal" runat="server">
                            <img alt="Cliente" src="../../Common/Images/Mantenimiento/Clientes.png" />                            
                        </div>
                        <asp:Label ID="lblEtiq" runat="server" Text=""></asp:Label>
                    </td>
                    <td>
                        <asp:ListBox ID="lstEmpleado" runat="server" Width="350px" Height="76px"></asp:ListBox>
                    </td>
                </tr>
                <tr>
                    <td align="right">
                        Ilimitado
                    </td>
                    <td>
                        <asp:CheckBox ID="chkIlimitado" runat="server" />
                    </td>
                </tr>
                <tr id="trValor" runat="server">
                    <td align="right">
                        <asp:Label ID="lblValor" runat="server" Text=""></asp:Label>
                    </td>
                    <td>
                        <asp:TextBox ID="txtValor" runat="server" Width="60px" MaxLength="3"></asp:TextBox>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <asp:Label id="lblMensaje" runat="server" style="font-style:italic;"></asp:Label>
                    </td>
                </tr>
            </table>
        </div>
        <br />
        <div style="text-align:right; width:100%">
            <div id="btnGuardar" class="btnNormal" runat="server">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCancelar" class="btnNormal" runat="server">
                <asp:Image ID="imgCancelar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cancelar</a>
            </div>
        </div>
        <script src="<%=UtilitarioWeb.ObtieneVersionArchivoEstatico("Conf_AgregarEmpleado_PolSeg.js")%>" type="text/javascript"></script>
    </form>
</body>
</html>