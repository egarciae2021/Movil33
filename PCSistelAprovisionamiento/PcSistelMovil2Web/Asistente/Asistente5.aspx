<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Asistente5.aspx.cs" Inherits="PcSistelMovil2Web.Asistente5" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
 
    <link href="../Styles/Sitio.css" rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/JqueryThemeRoller/redmond/jquery-ui-1.8.16.custom.css"
        rel="stylesheet" type="text/css" />
    <link href="../Common/Styles/jqGrid/ui.jqgrid.css" rel="stylesheet" type="text/css" />   
    <script src="../Scripts/json2.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/grid.locale-es.js" type="text/javascript"></script>
    <script src="../Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>
    <script src="../Common/Scripts/date.js" type="text/javascript"></script>
    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <link href="../Common/Styles/Principal2.css" rel="stylesheet" type="text/css" />
   
    <script src="Asistente5.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
// <![CDATA[

        function btcancelar_onclick() {

        }

// ]]>
    </script>
    <style type="text/css">
        .style1
        {
            width: 112px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div id="dvMsgAlertaExterna" style="display: none;">
        <span class="ui-icon ui-icon-alert" style="float: left;"></span>
        <div id="dvContenidoAlertaExterna">
        </div>
    </div>
    <div>
        <div id="MenuInstalacion2" style="margin-left: 10px; margin-right: auto; margin-top: 10px;
            margin-right: 10px; margin-bottom: auto; width: auto;">
            <div class="Contenidomenu">
                <table class="tblasistente tblconsolidado" width="90%">
                    <tr>
                        <th colspan="3" style="text-align: center;">
                            <label style="color: #084B8A">
                                Consolidado de Datos
                            </label>
                        </th>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <label style="color: #084B8A">
                                Datos Empresa</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="">
                            <asp:Label ID="Label13" runat="server" Text="Nombre :"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblempresa" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style1">
                            <asp:Label ID="Label1" runat="server" Text="Razón Social :"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblrazon" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                     <tr>
                        <td class="style1">
                            <asp:Label ID="Label4" runat="server" Text="Ruc :"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblruc" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style1">
                            <asp:Label ID="Label2" runat="server" Text="País :"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblpais" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style1">
                            <asp:Label ID="Label3" runat="server" Text="Logo :"></asp:Label>
                        </td>
                        <td>
                            <img id="imglogo" src='' style="width:160px;height:80px;float:left;" runat="server"/>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <label style="color: #084B8A">
                                Información de Contrato
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style1">
                            <asp:Label ID="Label5" runat="server" Text="Fecha Inicio :"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lflfechai" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style1">
                            <asp:Label ID="Label6" runat="server" Text="Fecha Fin :"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lflfechafin" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style1">
                            <asp:Label ID="Label7" runat="server" Text="Observación"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblobs" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style1">
                            <asp:Label ID="Label8" runat="server" Text="Descripción :"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lbldesc" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                   
                    <tr>
                        <td colspan="2">
                            <label style="color: #084B8A">
                                Información de Licencia
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style1">
                            <asp:Label ID="Label9" runat="server" Text="Tipo :"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lbltipolic" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style1">
                            <asp:Label ID="Label10" runat="server" Text="Líneas :"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lbllineas" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <label style="color: #084B8A">
                                Información del Servicio
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style1">
                            <asp:Label ID="Label11" runat="server" Text="Dominio"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lbldominio" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style1">
                            <asp:Label ID="Label12" runat="server" Text="Servidor BD :"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblsrvBD" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style1">
                            <asp:Label ID="Label14" runat="server" Text="Servidor APP :"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblsrvAPP" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style1">
                            <asp:Label ID="Label15" runat="server" Text="Servidor APP (APP MOVIL):"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblsrvAPP_A1" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td class="style1">
                            <asp:Label ID="Label17" runat="server" Text="Servidor APP (APP SECURITY):"></asp:Label>
                        </td>
                        <td>
                            <asp:Label ID="lblsrvAPP_A2" runat="server" Text=""></asp:Label>
                        </td>
                    </tr>
                     <tr>
                        <td colspan="2">
                            <label style="color: #084B8A">
                                Contactos Autorizados
                            </label>
                        </td>
                    </tr>             
                </table>
                     <div id="dvtitulares">
                               <table id="grid">
                            </table>
                            <div id="pgrid">
                            </div>
                            </div>
                <br />
                <div id="btnatras" class="btnNormal">
                    <a>Atrás</a>
                    <img src="../Common/images/Mantenimiento/flecha_antes.png" /></div>
                <div id="btcancelar" class="btnNormal">
                    <a>Cancelar</a>
                    <img src="../Common/images/Mantenimiento/btnCancel.png" /></div>
                <div id="btnfinalizar" class="btnNormal">
                    <a>Finalizar</a>
                    <img src="../Common/images/Mantenimiento/Procesar.png" /></div>
                <%--           <button id="btnatras" type="button" class="btn btn-primary">
                    Atrás</button>
                <button id="btcancelar" type="button" class="btn btn-primary" onclick="return btcancelar_onclick()">
                    Cancelar</button>
                <button id="btnfinalizar" type="button" class="btn btn-primary">
                    Finalizar</button>--%>
            </div>
        </div>
     
    </div>
    </form>
</body>
</html>
