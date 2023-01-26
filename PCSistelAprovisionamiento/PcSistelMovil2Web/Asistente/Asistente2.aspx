<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Asistente2.aspx.cs" Inherits="PcSistelMovil2Web.Asistente2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

  <link href="../Styles/Sitio.css" rel="stylesheet" type="text/css" />
       <link href="../Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css"
        rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/json2.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />

  
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Asistente2.js" type="text/javascript"></script>
</head>
<body id="bodyAsistente2">
    <form id="form1" runat="server">
           <div id="dvMsgAlertaExterna" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <div id="dvContenidoAlertaExterna">
        </div>
    </div>
  <div>

  <div id="MenuInstalacion2" style="margin-left: 10px; margin-right: auto; margin-top: 10px; margin-right:10px; margin-bottom: auto; width: auto;">
            <div class="Contenidomenu" >
            <table class="tblasistente">
                <tr>
                    <td colspan="3">
                        <label style="color: #084B8A">
                            Información de Contrato</label>
                    </td>
                </tr>
                <tr>
                    <td width="150px;">
                      <asp:Label ID="Label13" runat="server" Text="Fecha Inicio :"></asp:Label>
                    </td>
                    <td >
                        <asp:TextBox ID="fechai" runat="server" CssClass="txtFecha" ReadOnly="true" Enabled="false"></asp:TextBox>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                         <asp:Label ID="Label1" runat="server" Text="Fecha Fin :"></asp:Label>
                    </td>
                    <td>
                     <asp:TextBox ID="fechaf" runat="server" CssClass="txtFecha" ReadOnly="true" Enabled="false"></asp:TextBox>                      
                    </td>
                    <td>
                    </td>
                </tr>
                     <tr>
                    <td>
                         <asp:Label ID="Label2"  runat="server" Text="Observación :"></asp:Label>
                    </td>
                    <td>
                     <asp:TextBox ID="txtobs" runat="server" CssClass="" ReadOnly="true"></asp:TextBox>                      
                    </td>
                    <td>
                    </td>
                </tr>
                    <tr style="display: none;">
                    <td>
                        <asp:Label ID="Label3" runat="server" Text="Descripción :"></asp:Label>
                    </td>
                    <td>
                     <asp:TextBox ID="txtdesc" runat="server" CssClass="" ReadOnly="true"></asp:TextBox>                      
                    </td>
                    <td>
                    </td>
                </tr> 
               <tr>
               <td><asp:Label ID="Label4" runat="server" Text="Términos de Contrato :"></asp:Label></td>
               <td><asp:DropDownList ID="ddlContrato" runat="server" >                   
                        </asp:DropDownList> </td>
               </tr>     
            </table>
            <br />

            <div id="btnatras" class="btnNormal"><a>Atrás</a> <img src="../Common/images/Mantenimiento/flecha_antes.png" /></div>  
            <div id="btnsiguiente" class="btnNormal"><a>Siguiente</a> <img src="../Common/images/Mantenimiento/flecha_despues.png" /></div>
            <div id="btcancelar" class="btnNormal"><a>Cancelar</a> <img src="../Common/images/Mantenimiento/btnCancel.png" /></div>

         <%--   <button id="btnatrass" type="button" class="btn btn-primary">Atrás</button>
                        <button id="btnsiguiente" type="button" class="btn btn-primary">Siguiente</button>
                        <button id="btcancelar" type="button" class="btn btn-primary">Cancelar</button>--%>
                </div>
        </div>
        
    </div>
    </form>
</body>
</html>
