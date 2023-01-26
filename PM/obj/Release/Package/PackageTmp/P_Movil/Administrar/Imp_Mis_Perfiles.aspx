<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Imp_Mis_Perfiles.aspx.vb" Inherits=".Imp_Mis_Perfiles" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <script type="text/javascript" src="../Common/Scripts/json2.js"></script>
    <%--<link href="../Common/Styles/JqueryThemeRoller/ui-lightness/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />--%>
    <link href="../../Common/Styles/stylePivot.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <link href="../../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.base.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.common.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.formedit.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jquery.fmatter.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/JsonXml.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Common/Scripts/jqGrid/plugins/jquery.tablednd.js"></script>
    <script src="../../Common/Scripts/jqGrid/jqDnR.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/grid.jqueryui.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/jqGrid/jqModal.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.button.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="../../Common/Scripts/JqueryUI/jquery.ui.position.js" type="text/javascript"></script>  
    <script src="Imp_Mis_Perfiles.js" type="text/javascript"></script> 
</head>
<body style="font-family: verdana; font-size: 11px">
    <form id="form1" runat="server">

    <asp:HiddenField ID="hdfCodEmp" runat="server" />
    <asp:HiddenField ID="hdfIdPerfil" runat="server" Value="-1"/>
    <div>
    
      <table id="tbPerfiles"></table> 

      <br />

      <table width="100%" border="0"> 
        <tr>
          <td align="left" >
            <div id="btnQuitarReporte" class="btnNormal" runat="server">
                <asp:Image ID="imgQuitar" runat="server" ImageUrl="~/Common/Images/remove.png" />
                <a>Quitar</a>
            </div>
          </td>
          <td>&nbsp;</td>
          <td width="110px" align="right" >
            <div id="btnAceptar" class="btnNormal" runat="server">
                <asp:Image ID="imgAceptar" runat="server" ImageUrl="~/Common/Images/Guardar.png" />
                <a>Aceptar</a>
            </div>
          </td>
          <td width="110px"  align="right" >
            <div id="btnCancelar" class="btnNormal" runat="server">
                <asp:Image ID="imgCancelar" runat="server" ImageUrl="~/Common/Images/Salir.gif" />
                <a>Cancelar</a>
            </div>               
          </td>
        </tr>
      </table>
      
      
    </div>

    <div id="divMsgConfirmacion" style="display:none;">
        <span class="ui-icon ui-icon-alert" style="float:left;"></span>
        <asp:Label ID="lblMensajeConfirmacion" runat="server" Text=""></asp:Label>
    </div>
    </form>
</body>
</html>
