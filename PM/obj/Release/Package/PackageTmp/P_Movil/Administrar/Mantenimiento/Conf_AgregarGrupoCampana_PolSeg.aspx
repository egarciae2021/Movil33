<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Conf_AgregarGrupoCampana_PolSeg.aspx.vb" Inherits=".Conf_AgregarGrupoCampana_PolSeg" %>
<%@ Register src="../../../Common/Controles/BusquedaPrincipal.ascx" tagname="BusquedaPrincipal" tagprefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
	<script type="text/javascript" src="../../../Common/Scripts/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.core.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="../../../Common/Scripts/JqueryUI/jquery.ui.button.js"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Conf_AgregarGrupoCampana_PolSeg.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfPolitica" runat="server" />
        <asp:HiddenField ID="hdfGrupo" runat="server" />
        <asp:HiddenField ID="hdfOpcion" runat="server" />
        <div id="dvCargando" class="dvCargando"></div>
        <div class="dvPanel" style="text-align:right; width:95%"> 
            <table>
                <tr>
                    <td>
                        Grupo Empleado:
                    </td>
                    <td align="left">
                        <asp:DropDownList ID="ddlGrupo" runat="server" Width="250px"></asp:DropDownList>
                        <b><asp:Label ID="lblGrupo" runat="server" Text=""></asp:Label></b>
                    </td>
                </tr>
            </table>
            <div id="dvContenedorTecRes" runat="server">
                <uc1:BusquedaPrincipal ID="bpTecnicoResponsable" runat="server"/>
            </div>

        </div>
        <br />    
        <div style="text-align:right;">   
            <div id="btnGuardar" class="btnNormal" runat="server">
                <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                <a>Guardar</a>
            </div>
            <div id="btnCancelar" class="btnNormal" runat="server">
                <asp:Image ID="imgCancelar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                <a>Cancelar</a>
            </div>
        </div>
    </form>

</body>
</html>
